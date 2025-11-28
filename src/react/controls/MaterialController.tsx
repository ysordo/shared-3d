/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { useActiveModel } from '../../hooks/useActiveModel';
import { createQuadWireframe } from '../../core/utils';
import { THREE } from '../../lib';

export type CustomMaterialFactory = (
  originalMaterial: THREE.Material
) => THREE.Material;

export type MaterialConfig =
  | {
      name: string;
      type: 'textured';
    }
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
      [key: string]: any;
    }
  | {
      name: string;
      type: 'custom';
      factory: CustomMaterialFactory;
    };

type MaterialItem = {
  name: string;
  apply: () => void;
  isActive: boolean;
};

type MaterialControllerProps = {
  materials: MaterialConfig[];
  transitionDuration?: number;
  children: (items: MaterialItem[]) => ReactNode;
  className?: string;
};

export const MaterialController: React.FC<MaterialControllerProps> = ({
  materials,
  transitionDuration = 0,
  children,
  className,
}) => {
  const model = useActiveModel();
  const [activeName, setActiveName] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!model) {
      return;
    }

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }

      if (!child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material;
      }

      if (!child.getObjectByName(`${child.name}-wireframe`)) {
        const wireGeo = createQuadWireframe(child.geometry);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x000000,
          linewidth: 3,
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
    });
  }, [model]);

  const applyMaterial = async (config: MaterialConfig) => {
    if (!model || isTransitioning) {
      return;
    }

    setIsTransitioning(transitionDuration > 0);

    const meshes: THREE.Mesh[] = [];
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });

    if (transitionDuration === 0) {
      meshes.forEach((child) => applyMaterialToMesh(child, config));
      setActiveName(config.name);
      setIsTransitioning(false);
      return;
    }

    const delayPerMesh = transitionDuration / meshes.length;

    for (let i = 0; i < meshes.length; i++) {
      setTimeout(() => {
        applyMaterialToMesh(meshes[i] as THREE.Mesh, config);
        if (i === meshes.length - 1) {
          setActiveName(config.name);
          setIsTransitioning(false);
        }
      }, i * delayPerMesh);
    }
  };

  const applyMaterialToMesh = (child: THREE.Mesh, config: MaterialConfig) => {
    const wireframe = child.getObjectByName(
      `${child.name}-wireframe`
    ) as THREE.LineSegments;

    let newMat: THREE.Material;

    switch (config.type) {
      case 'textured':
        newMat = child.userData.originalMaterial;
        if (wireframe) {
          wireframe.visible = false;
        }
        break;

      case 'solid':
        newMat = new THREE.MeshStandardMaterial({
          color: config.color ?? 0x888888,
          metalness: config.metalness ?? 0,
          roughness: config.roughness ?? 0.9,
        });
        if (wireframe) {
          wireframe.visible = false;
        }
        break;

      case 'wireframe':
        newMat = new THREE.MeshStandardMaterial({
          color: config.color ?? 0x888888,
          metalness: config.metalness ?? 0,
          roughness: config.roughness ?? 0.9,
          transparent: true,
          opacity: 0.95,
        });
        if (wireframe) {
          wireframe.visible = true;
          (wireframe.material as THREE.LineBasicMaterial).color.set(
            config.lineColor ?? 0x000000
          );
        }
        break;

      case 'custom':
        newMat = config.factory(child.userData.originalMaterial);
        if (wireframe) {
          wireframe.visible = false;
        }
        break;
    }

    child.material = newMat;
  };

  const items: MaterialItem[] = materials.map((config) => ({
    name: config.name,
    apply: () => applyMaterial(config),
    isActive: activeName === config.name,
  }));

  useEffect(() => {
    if (items.length > 0 && !activeName) {
      items[0]?.apply?.();
    }
  }, [items]);

  if (!model || items.length === 0) {
    return null;
  }

  return <div className={className}>{children(items)}</div>;
};
