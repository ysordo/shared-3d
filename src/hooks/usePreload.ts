'use client';
import { useScene as useSceneContext } from '../context/SceneContext';
import type { THREE } from '../lib';

export const usePreload = (): Map<string,THREE.Group> => {
  const {preload} = useSceneContext();
  return preload;
};