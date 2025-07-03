'use client';
import type * as THREE from 'three';
import { useEffect } from 'react';
import { useSceneContext } from './SceneContext';

/**
 * Props for the MaterialController component.
 * @property {string} modelId - Unique identifier for the model to apply the material to.
 * @property {'basic' | 'phong' | 'standard' | 'physical'} materialType - Type of material to apply.
 * @property {THREE.MaterialParameters} materialOptions - Parameters for the material.
 * @property {boolean} [wireframe=false] - Whether to render the material in wireframe mode.
 * @typedef {Object} MaterialControllerProps
 */
interface MaterialControllerProps {
  modelId: string;
  materialType: 'basic' | 'phong' | 'standard' | 'physical';
  materialOptions: THREE.MaterialParameters;
  wireframe?: boolean;
}

export const MaterialController = ({
  modelId,
  materialType,
  materialOptions,
  wireframe = false
}: MaterialControllerProps) => {
  const { sceneManager } = useSceneContext();

  useEffect(() => {
    if (sceneManager) {
      sceneManager.setMaterial(modelId, materialType, materialOptions);
      sceneManager.setWireframe(modelId, wireframe);
    }
  }, [modelId, materialType, materialOptions, wireframe, sceneManager]);

  return null;
};