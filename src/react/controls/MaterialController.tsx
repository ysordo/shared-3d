'use client';

import type { ReactNode } from 'react';
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
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
  materials: MaterialConfig[];
  activeDefault?: string;
  transitionDuration?: number;
  children: (items: MaterialItem[]) => ReactNode;
  className?: string;
};

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
  const timeoutsRef = useRef<number[]>([]);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!model) {
      meshesRef.current = [];
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
          linewidth: 1,
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
  }, [model]);

  const applyToMesh = useCallback(
    (mesh: THREE.Mesh, config: MaterialConfig) => {
      const wireframe = mesh.getObjectByName(
        `${mesh.name}-wireframe`
      ) as THREE.LineSegments;

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
            opacity: 0.05,
            side: THREE.DoubleSide,
          });
          if (wireframe) {
            wireframe.visible = true;
            (wireframe.material as THREE.LineBasicMaterial).color.set(
              config.lineColor ?? 0xffffff
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

  const applyMaterial = useCallback(
    (config: MaterialConfig) => {
      if (!model || isTransitioning || meshesRef.current.length === 0) {
        return;
      }
      setOldName(activeName??'');

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

  useEffect(() => {
    if (activeName || items.length === 0) {
      return;
    }
    const defaultItem = items.find((i) => i.name === activeDefault);
    if (defaultItem) {
      defaultItem.apply();
    }
  }, [items, activeDefault, activeName]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  if (!model) {
    return null;
  }

  return <div className={className}>{children(items)}</div>;
};
