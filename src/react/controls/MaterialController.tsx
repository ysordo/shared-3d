'use client';

import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { useActiveModel } from '../hooks/useActiveModel';
//import { createQuadWireframe } from '../../core/utils';
import { THREE } from '../../lib';

const TEXTURE_PROPS = [
  'map',
  'alphaMap',
  'metalnessMap',
  'roughnessMap',
  'specularMap',
  'clearcoatMap',
  'clearcoatNormalMap',
  'clearcoatRoughnessMap',
  'sheenColorMap',
  'sheenRoughnessMap',
  'transmissionMap',
  'thicknessMap',
];

export type CustomMaterialFactory = (
  originalMaterial: THREE.Material,
) => THREE.Material;

type Texture = { name: string; type: 'textured' };
type Solid = Omit<Texture, 'type'> & {
  type: 'solid';
  color?: THREE.ColorRepresentation;
  metalness?: number;
  roughness?: number;
  keepGlass?: boolean;
  keepLight?: 'blender' | 'default' | 'none';
};
type Wireframe = Omit<Solid, 'type'> & {
  type: 'wireframe';
  lineColor?: THREE.ColorRepresentation;
};

export type MaterialConfig =
  | Texture
  | Solid
  | Wireframe
//  | { name: string; type: 'custom'; factory: CustomMaterialFactory };

type MaterialItem = {
  name: string;
  oldName: string;
  nextName: string;
  apply: () => void;
  isActive: boolean;
  percentage: number;
};

type MaterialControllerProps = {
  materials: MaterialConfig[];
  activeDefault?: string;
  transitionDuration?: number;
  children: (
    items: MaterialItem[],
    isTransitioning?: boolean,
  ) => React.ReactNode;
  className?: string;
};

/**
 * MaterialController
 *
 * Componente declarativo para cambio dinámico y animado de materiales en el modelo activo.
 *
 * Problemas identificados y corregidos:
 * 1. **No renderizado**: Early return `if (!model)` antes de hooks → violación Rules of Hooks.
 * 2. **Estado inicial inconsistente**: `activeName` null hasta primer apply → items con prevName vacío.
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
/*export const MaterialController: React.FC<MaterialControllerProps> = ({
  materials,
  activeDefault,
  transitionDuration = 300,
  children,
  className,
}) => {
  const model = useActiveModel();

  const [activeName, setActiveName] = useState<string | null>(null);
  const [oldName, setOldName] = useState<string>('');
  const [nextName, setNextName] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [percentage, setPercentage] = useState(0);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const processedModelRef = useRef<THREE.Group | null>(null);
  const timeoutsRef = useRef<number[]>([]);

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

      if (!child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material.clone();
      }

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
    processedModelRef.current = model;
  }, [model]);

  const applyToMesh = useCallback(
    (mesh: THREE.Mesh, config: MaterialConfig) => {
      const wireframe = mesh.getObjectByName(
        `${mesh.name}-wireframe`
      ) as THREE.LineSegments | null;

      const original = mesh.userData.originalMaterial;
      let newMaterials: THREE.Material | THREE.Material[];

      switch (config.type) {
        case 'textured':
          newMaterials = original;
          if (wireframe) {
            wireframe.visible = false;
          }
          break;

        case 'solid':
        case 'wireframe':
          const isWireframe = config.type === 'wireframe';

          if (Array.isArray(original)) {
            newMaterials = original.map((origMat: THREE.Material) => {
              return synthesizeMaterial(origMat.clone(), isWireframe, config);
            });
          } else {
            newMaterials = synthesizeMaterial(
              original.clone(),
              isWireframe,
              config
            );
          }

          if (wireframe) {
            wireframe.visible = isWireframe;
            if (isWireframe) {
              (wireframe.material as THREE.LineBasicMaterial).color.set(
                config.lineColor ?? 0x000000
              );
            }
          }
          break;

        case 'custom':
          if (Array.isArray(original)) {
            newMaterials = original.map((mat: THREE.Material) =>
              config.factory(mat)
            );
          } else {
            newMaterials = config.factory(original);
          }
          if (wireframe) {
            wireframe.visible = false;
          }
          break;

        default:
          return;
      }

      mesh.material = newMaterials;
    },
    []
  );

  const applyMaterial = useCallback(
    (config: MaterialConfig) => {
      if (!model || isTransitioning || meshesRef.current.length === 0) {
        return;
      }
      setOldName(activeName ?? '');
      setNextName(config.name);

      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      setIsTransitioning(true);
      setPercentage(0);

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
          setPercentage((completed / meshesRef.current.length) * 100);

          if (completed === meshesRef.current.length) {
            setActiveName(config.name);
            setIsTransitioning(false);
          }
        }, i * delay);

        timeoutsRef.current.push(timeoutId);
      });
    },
    [model, isTransitioning, activeName, transitionDuration, applyToMesh]
  );

  const items = useMemo<MaterialItem[]>(
    () =>
      materials.map((config) => ({
        name: config.name,
        oldName,
        nextName,
        apply: () => applyMaterial(config),
        isActive: activeName === config.name,
        percentage,
      })),
    [materials, oldName, nextName, activeName, percentage, applyMaterial]
  );

  useEffect(() => {
    if (!model || activeName || items.length === 0) {
      return;
    }

    const defaultItem = items.find((i) => i.name === activeDefault) || items[0];
    if (defaultItem && meshesRef.current.length > 0) {
      defaultItem.apply();
    }
  }, [model, items, activeDefault, activeName]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  if (!model) {
    return <div className={className}>{children([], false)}</div>;
  }

  return <div className={className}>{children(items, isTransitioning)}</div>;
};

function synthesizeMaterial(
  cloned: THREE.Material,
  isWireframe: boolean,
  config: any
): THREE.Material {
  if ('color' in cloned && cloned.color instanceof THREE.Color) {
    cloned.color.set(config.color ?? 0x888888);
  } else {
    (cloned as any).color = new THREE.Color(config.color ?? 0x888888);
  }
  if ('alphaTest' in cloned) {
    cloned.alphaTest = 0;
  }
  for (const key of TEXTURE_PROPS) {
    if (key in cloned) {
      (cloned as any)[key] = null;
    }
  }
  if ('metalness' in cloned) {
    cloned.metalness = config.metalness ?? cloned.metalness;
  }
  if ('roughness' in cloned) {
    cloned.roughness = config.roughness ?? cloned.roughness;
  }
  if ('transmission' in cloned) {
    cloned.transmission = 0;
  }
  if ('thickness' in cloned) {
    cloned.thickness = 0;
  }
  if ('ior' in cloned) {
    cloned.ior = 1;
  }

  if (isWireframe) {
    cloned.transparent = true;
    cloned.opacity = 0.95;
  } else {
    cloned.transparent = false;
    cloned.opacity = 1;
  }

  cloned.needsUpdate = true;
  return cloned;
}*/

import {
  injectShader,
  runPaintTransition,
  setupModelBounds,
  transitionUniforms,
} from '../../shaders/Paint';

export const MaterialController: React.FC<MaterialControllerProps> = ({
  materials,
  activeDefault,
  transitionDuration = 1200, // Ahora se respetará este tiempo real
  children,
  className,
}) => {
  const model = useActiveModel();

  const [activeName, setActiveName] = useState<string | null>(null);
  const [oldName, setOldName] = useState<string>('');
  const [nextName, setNextName] = useState<string>('');
  const [percentage, setPercentage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const processedModelRef = useRef<THREE.Group | null>(null);

  // Inicialización y configuración de Shaders
  useEffect(() => {
    if (!model || processedModelRef.current === model) {return;}

    setupModelBounds(model);
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Importante: inyectar el shader que maneja profundidad para cristales
        injectShader(child.material);
      }
    });
    processedModelRef.current = model;
  }, [model]);

  const applyMaterial = useCallback(
    async (config: MaterialConfig) => {
      // Permitimos el cambio si no es el mismo material activo
      if (!model || isTransitioning || config.name === activeName) {return;}

      setIsTransitioning(true);
      setOldName(activeName ?? '');
      setNextName(config.name);
      setPercentage(0);

      const isTextured = config.type === 'textured';
      const isWire = config.type === 'wireframe';

      // 1. Configuración de Apariencia (Blender Style)
      // Ajustamos intensidad de luz para look mate y decidimos si mantener cristales
      transitionUniforms.uUseTexture.value = isTextured ? 1.0 : 0.0;
      transitionUniforms.uLightIntensity.value = (isTextured || config.keepLight === 'default') ? 1.0 : (config.keepLight === 'blender' ? 0.6 : 0.0);
      // 'keepGlass' debe venir en tu MaterialConfig para decidir si el cristal se vuelve sólido
      transitionUniforms.uGlassOpacity.value = isTextured ? 1.0 : (config.keepGlass ? 1.0 : 0.0);

      // 2. Ejecución de la Animación
      if (!isTextured) {
        const targetColor = config.color?.toString() || '#888888';

        // Iniciamos la animación de GSAP que ahora devuelve el tween correctamente
        const animation = runPaintTransition(
          targetColor,
          isWire,
          transitionDuration
        );

        // Sincronización del porcentaje con la UI
        animation.eventCallback('onUpdate', () => {
          const p = Math.round(animation.progress() * 100);
          setPercentage(p);
        });

        await animation;
      } else {
        // Si es textura, saltamos la animación o podrías animar uUseTexture
        setPercentage(100);
      }

      // 3. Finalización de estados
      setActiveName(config.name);
      setIsTransitioning(false);
      // No reseteamos percentage a 0 aquí para que la UI no parpadee al terminar
    },
    [model, isTransitioning, activeName, transitionDuration]
  );

  const items = useMemo<MaterialItem[]>(
    () =>
      materials.map((config) => ({
        name: config.name,
        oldName,
        nextName,
        isActive: activeName === config.name,
        // El porcentaje solo se muestra para el item que está transicionando
        percentage,
        apply: () => applyMaterial(config),
      })),
    [materials, oldName, nextName, activeName, percentage, applyMaterial]
  );

  // Aplicar default inicial
  useEffect(() => {
    if (!model || activeName || items.length === 0) {return;}
    
    const def = items.find((i) => i.name === activeDefault) || items[0];
    if (def) {
      // Para el primer render, forzamos los valores sin esperar el await del click
      const config = materials.find(m => m.name === def.name);
      if (config) {applyMaterial(config);}
    }
  }, [model, items, activeDefault, activeName, materials, applyMaterial]);

  if (!model) {
    return <div className={className}>{children([], false)}</div>;
  }

  return <div className={className}>{children(items, isTransitioning)}</div>;
};

