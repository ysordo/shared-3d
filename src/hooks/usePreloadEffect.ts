'use client';
import { useEffect } from 'react';
import type { THREE } from '../lib';
import { usePreload } from './usePreload';

export const usePreloadEffect = (
    factory: (preload: Map<string, THREE.Group<THREE.Object3DEventMap>>) => void,
    deps: any[] = []
) => {
  const preload = usePreload();
  useEffect(()=>{
    if(!preload){return;}
    factory(preload);
  }, [...deps]);
};