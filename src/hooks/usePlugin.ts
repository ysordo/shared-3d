'use client';

import { useEffect, useRef } from 'react';
import { useScene } from './useScene';
import type { Plugin } from '../core/orchestrator/types';

export const usePlugin = <T extends Plugin>(
  name: string,
  factory: () => T,
  deps: any[] = [],
): T | undefined => {
  const orch = useScene();

  useEffect(() => {
    if(!orch){return;}
    const plugin = orch.plugin<T>(name);
    if (!plugin) {
      orch.use(factory());
    }

    return () => {
      if (plugin) {
        plugin.dispose?.();
        orch.remove(name);
      }
    };
  }, [orch, ...deps]);
  return orch.plugin<T>(name);
};