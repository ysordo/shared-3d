'use client';
import { useSceneContext } from '../context/SceneContext';
import type { THREE } from '../lib';

type TX = 'array' | 'map';
type TR = {
  array: {key: string, model: THREE.Group}[],
  map: Map<string, THREE.Group<THREE.Object3DEventMap>>
};


export const usePreload = <T extends TX = 'map'>(): TR[T] | null => {
  const orchestrator = useSceneContext();
  if(!orchestrator){return null;}
  if ((undefined as unknown as T) === 'array') {
    const arr: { key: string; model: THREE.Group }[] = [];
    orchestrator.preload.forEach((model, key) => arr.push({ key, model }));
    return arr as TR[T];
  }
  return orchestrator.preload as TR[T];
};
