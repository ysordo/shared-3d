'use client';
import { useScene as useSceneContext } from '../context/SceneContext';
import type { THREE } from '../lib';

export const useActiveModel = (): THREE.Group | null => {
  const {activeModel} = useSceneContext();
  return activeModel;
};