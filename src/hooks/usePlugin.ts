'use client';

import { useEffect, useRef } from 'react';
import { useScene } from './useScene';
import type { Plugin } from '../core/orchestrator/types';

export const usePlugin = <T extends Plugin>(
  factory:  T,
  deps: any[] = [],
): T | undefined => {
  const orch = useScene();
  const plugin = useRef<T>(factory);

  useEffect(() => {
    orch.use(plugin.current);
    return () => {
      if(plugin.current){
        plugin.current.dispose?.();
        orch.remove(factory.name);
      }
    };
  }, deps);
  return plugin.current;
};