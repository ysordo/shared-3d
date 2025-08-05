'use client';
import type * as THREE from 'three';
import { useEffect } from 'react';
import { useSceneContext } from './SceneContext';

/**
 * Props for the MaterialController component.
 * @property {'basic' | 'phong' | 'standard' | 'physical'} materialType - Type of material to apply.
 * @property {THREE.MaterialParameters} materialOptions - Parameters for the material.
 * @property {boolean} [wireframe=false] - Whether to render the material in wireframe mode.
 * @typedef {Object} MaterialControllerProps
 */
interface MaterialControllerProps {
  materialType: 'basic' | 'phong' | 'standard' | 'physical';
  materialOptions: THREE.MaterialParameters;
  wireframe?: boolean;
}

/**
 * Component to control the material of the active model in a 3D scene.
 * It applies the specified material type and options to the active model.
 * @param {MaterialControllerProps} props - Component properties
 * @param {'basic' | 'phong' | 'standard' | 'physical'} props.materialType - Type of material to apply
 * @param {THREE.MaterialParameters} props.materialOptions - Parameters for the material
 * @param {boolean} [props.wireframe=false] - Whether to render the material in wireframe mode
 * @returns {null} This component does not render anything directly
 */
export function MaterialController({
  materialType,
  materialOptions,
  wireframe = false
}: MaterialControllerProps): null {
  const { sceneManager } = useSceneContext();

  useEffect(() => {
    if (sceneManager) {
      sceneManager.setMaterial(sceneManager.getModelActiveId()!, materialType, materialOptions);
      sceneManager.setWireframe(sceneManager.getModelActiveId()!, wireframe);
    }
  }, [materialType, materialOptions, wireframe, sceneManager]);

  return null;
};