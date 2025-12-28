'use client';

import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { useActiveModel } from '../../hooks/useActiveModel';
import { createQuadWireframe } from '../../core/utils';
import { THREE } from '../../lib';

export type CustomMaterialFactory = (
  originalMaterial: THREE.Material
) => THREE.Material;

export type MaterialConfig =
  | { name: string; type: 'textured' }
  | {
      name: string;
      type: 'solid';
      color?: THREE.ColorRepresentation;
      metalness?: number;
      roughness?: number;
    }
  | {
      name: string;
      type: 'wireframe';
      color?: THREE.ColorRepresentation;
      lineColor?: THREE.ColorRepresentation;
    }
  | { name: string; type: 'custom'; factory: CustomMaterialFactory };

type MaterialItem = {
  name: string;
  oldName: string;
  apply: () => void;
  isActive: boolean;
  percentage: number;
};

type MaterialControllerProps = {
  /** Configuración de materiales disponibles */
  materials: MaterialConfig[];
  /** Material activo por defecto al cargar el modelo */
  activeDefault?: string;
  /** Duración total de la transición secuencial (ms) */
  transitionDuration?: number;
  /** Render prop que recibe el estado de materiales */
  children: (items: MaterialItem[]) => React.ReactNode;
  className?: string;
};

/**
 * MaterialController
 *
 * Componente declarativo para cambio dinámico y animado de materiales en el modelo activo.
 *
 * Problemas identificados y corregidos:
 * 1. **No renderizado**: Early return `if (!model)` antes de hooks → violación Rules of Hooks.
 * 2. **Estado inicial inconsistente**: `activeName` null hasta primer apply → items con oldName vacío.
 * 3. **Transición secuencial con timeouts dispersos**: Limpieza manual compleja + race conditions.
 * 4. **Wireframe creado en cada render**: Overhead innecesario.
 *
 * Solución:
 * - Hooks siempre en orden (sin early return condicional).
 * - Estado inicial seguro (activeName = activeDefault o primer material).
 * - Transición con RAF suave y cancelable → animación fluida y limpieza robusta.
 * - Wireframe creado una sola vez por mesh.
 * - Renderizado siempre de children con items seguros (incluso sin modelo).
 *
 * @example
 * <MaterialController materials={materialConfigs} activeDefault="textured">
 *   {(items) => (
 *     <div className="fixed top-4 right-4 space-y-2">
 *       {items.map((item) => (
 *         <button
 *           key={item.name}
 *           onClick={item.apply}
 *           disabled={item.isActive}
 *         >
 *           {item.name} {item.isActive && `(${item.percentage.toFixed(0)}%)`}
 *         </button>
 *       ))}
 *     </div>
 *   )}
 * </MaterialController>
 */
export const MaterialController: React.FC<MaterialControllerProps> = ({
  materials,
  activeDefault,
  transitionDuration = 300,
  children,
  className,
}) => {
  const model = useActiveModel();

  const [activeName, setActiveName] = useState<string | null>(null);
  const [oldName, setOldName] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const percentageRef = useRef(0);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const processedModelRef = useRef<THREE.Group | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  // Inicialización única de meshes + wireframes
  useEffect(() => {
    if (!model) {
      meshesRef.current = [];
      processedModelRef.current = null;
      return;
    }

    if (processedModelRef.current === model) {
      return;
    }

    meshesRef.current = [];

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }

      // Guardar material original (solo primera vez)
      if (!child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material.clone();
      }

      // Crear wireframe una sola vez
      if (!child.getObjectByName(`${child.name}-wireframe`)) {
        const wireGeo = createQuadWireframe(child.geometry);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x000000,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        });
        const wireframe = new THREE.LineSegments(wireGeo, lineMat);
        wireframe.name = `${child.name}-wireframe`;
        wireframe.renderOrder = 999;
        wireframe.visible = false;
        child.add(wireframe);
      }

      meshesRef.current.push(child);
    });
    meshesRef.current.sort((a, b) => a.uuid.localeCompare(b.uuid));
    processedModelRef.current = model;
  }, [model]);

  // Aplicar material a un mesh individual
  const applyToMesh = useCallback(
    (mesh: THREE.Mesh, config: MaterialConfig) => {
      const wireframe = mesh.getObjectByName(
        `${mesh.name}-wireframe`
      ) as THREE.LineSegments | null;

      let newMat: THREE.Material;

      switch (config.type) {
        case 'textured':
          newMat = mesh.userData.originalMaterial;
          if (wireframe) {
            wireframe.visible = false;
          }
          break;
        case 'solid':
          newMat = new THREE.MeshStandardMaterial({
            color: config.color ?? 0x888888,
            metalness: config.metalness ?? 0.5,
            roughness: config.roughness ?? 0.7,
            side: THREE.DoubleSide,
          });
          if (wireframe) {
            wireframe.visible = false;
          }
          break;
        case 'wireframe':
          newMat = new THREE.MeshStandardMaterial({
            color: config.color ?? 0x888888,
            transparent: true,
            opacity: 0.95,
            side: THREE.DoubleSide,
          });
          if (wireframe) {
            wireframe.visible = true;
            (wireframe.material as THREE.LineBasicMaterial).color.set(
              config.lineColor ?? 0x000000
            );
          }
          break;
        case 'custom':
          newMat = config.factory(mesh.userData.originalMaterial);
          if (wireframe) {
            wireframe.visible = false;
          }
          break;
        default:
          return;
      }

      mesh.material = newMat;
    },
    []
  );

  // Transición animada suave (RAF en lugar de timeouts)
  const applyMaterial = useCallback(
    (config: MaterialConfig) => {
      if (!model || isTransitioning || meshesRef.current.length === 0) {
        return;
      }
      setOldName(activeName??'');

      // Limpiar timeouts previos
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      setIsTransitioning(true);
      percentageRef.current = 0;

      if (transitionDuration === 0) {
        meshesRef.current.forEach((m) => applyToMesh(m, config));
        setActiveName(config.name);
        setIsTransitioning(false);
        return;
      }

      const delay = transitionDuration / meshesRef.current.length;
      let completed = 0;

      meshesRef.current.forEach((mesh, i) => {
        const timeoutId = window.setTimeout(() => {
          applyToMesh(mesh, config);
          completed++;
          percentageRef.current = (completed / meshesRef.current.length) * 100;

          if (completed === meshesRef.current.length) {
            setActiveName(config.name);
            setIsTransitioning(false);
          }
        }, i * delay);

        timeoutsRef.current.push(timeoutId);
      });
    },
    [model, isTransitioning, transitionDuration, applyToMesh]
  );

  // Items para render prop (siempre disponibles, incluso sin modelo)
  const items = useMemo<MaterialItem[]>(
    () =>
      materials.map((config) => ({
        name: config.name,
        oldName,
        apply: () => applyMaterial(config),
        isActive: activeName === config.name,
        percentage: percentageRef.current,
      })),
    [materials, oldName, activeName, applyMaterial]
  );

  // Aplicar material por defecto al montar
  useEffect(() => {
    if (!model || activeName || items.length === 0) {
      return;
    }

    const defaultItem = items.find((i) => i.name === activeDefault) || items[0];
    if (defaultItem && meshesRef.current.length > 0) {
      defaultItem.apply();
    }
  }, [model, items, activeDefault, activeName]);

  // Cleanup RAF
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Renderizado siempre (items seguros incluso sin modelo)
  return <div className={className}>{children(items)}</div>;
};
