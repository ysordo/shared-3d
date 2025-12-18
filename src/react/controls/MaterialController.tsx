'use client';
import type { ReactNode } from 'react';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
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
      [key: string]: any;
    }
  | { name: string; type: 'custom'; factory: CustomMaterialFactory };

type MaterialItem = {
  name: string;
  oldName: string | null;
  apply: () => void;
  isActive: boolean;
  percentage: number;
};

type MaterialControllerProps = {
  materials: MaterialConfig[];
  activeDefault?: MaterialConfig['name'];
  transitionDuration?: number;
  children: (items: MaterialItem[]) => ReactNode;
  className?: string;
};

export const MaterialController: React.FC<MaterialControllerProps> = ({
  materials,
  activeDefault = materials[0]!.name,
  transitionDuration = 0,
  children,
  className,
}) => {
  const model = useActiveModel();
  const [activeName, setActiveName] = useState<string | null>(null);
  const [oldName, setOldName] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const meshes = useRef<THREE.Mesh[]>([]);
  const percentage = useRef<number>(0);

  useEffect(() => {
    if (!model) {
      return;
    }

    meshes.current = [];
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
      meshes.current.push(child);
    });
  }, [model]);

  const applyMaterial = useCallback( async (config: MaterialConfig) => {
    if (!model || isTransitioning) {
      return;
    }
    setOldName(activeName);

    setIsTransitioning(transitionDuration > 0);

    if (transitionDuration === 0) {
      meshes.current.forEach((child) => applyMaterialToMesh(child, config));
      setActiveName(config.name);
      setIsTransitioning(false);
      return;
    }

    const delayPerMesh = transitionDuration / meshes.current.length;
    for (let i = 0; i < meshes.current.length; i++) {
      setTimeout(() => {
        applyMaterialToMesh(meshes.current[i] as THREE.Mesh, config);
        percentage.current = Number.parseFloat(((i/ meshes.current.length - 1)/100).toFixed(1));
        if (i === meshes.current.length - 1) {
          setActiveName(config.name);
          setIsTransitioning(false);
        }
      }, i * delayPerMesh);
    }
  },[]);

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
          side: THREE.DoubleSide,
          flatShading: false,
          dithering: true,
          precision: 'highp',
          shadowSide: THREE.FrontSide,
          clipShadows: true,
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
          flatShading: false,
          dithering: true,
          precision: 'highp',
          shadowSide: THREE.FrontSide,
          clipShadows: true,
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

  const items = useMemo(() => {
    return materials.map((config) => ({
      name: config.name,
      oldName: oldName,
      apply: () => applyMaterial(config),
      isActive: activeName === config.name,
      percentage: percentage.current
    }));
  }, [percentage, materials, activeName, applyMaterial, oldName]);

  useEffect(() => {
    if (items.length > 0 && !activeName) {
      items.find((n) => n.name === activeDefault)?.apply();
    }
  }, [activeDefault, items]);

  if (!model) {
    return null;
  }

  return <div className={className}>{children(items)}</div>;
};
