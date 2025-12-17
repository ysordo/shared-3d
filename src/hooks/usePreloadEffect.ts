'use client';
import { useEffect } from 'react';
import { useSceneContext } from '../context/SceneContext';
import type { THREE } from '../lib';

export const usePreloadEffect = (
    factory: (preload: Map<string, THREE.Group<THREE.Object3DEventMap>>) => void,
    deps: any[] = []
) => {
  const preload = useSceneContext().preload;
  useEffect(()=>{
    factory(preload);
  }, [...deps]);
};