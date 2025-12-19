'use client';

import { useEffect } from 'react';
import { useScene } from './useScene';
import type { Plugin } from '../core/orchestrator/types';

export const usePlugin = <T extends Plugin>(
  factory:  T,
  deps: any[] = [],
): T | undefined => {
  const orch = useScene();

  useEffect(() => {
    if(!orch){return;}
    orch.remove(factory.name);
    orch.use(factory);

    return () => {
      orch.plugin<T>(factory.name)?.dispose?.();
      orch.remove(factory.name);
    };
  }, [orch, ...deps]);
  return orch.plugin<T>(factory.name);
};