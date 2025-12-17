'use client';

import { useEffect, useRef } from 'react';
import { useScene } from './useScene';
import type { Plugin } from '../core/orchestrator/types';

export const usePlugin = <T extends Plugin>(
  factory: () => T,
  deps: any[] = []
) => {
  const orchestrator = useScene();
  const pluginRef = useRef<T | null>(null);

  useEffect(() => {
    if (!pluginRef.current) {
      pluginRef.current = factory();
      orchestrator.use(pluginRef.current);
    }

    return () => {
      if (pluginRef.current) {
        const name = pluginRef.current.name;
        orchestrator.remove(name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
    };
  }, [orchestrator, ...deps]);
};