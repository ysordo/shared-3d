'use client';
import { useSyncExternalStore } from 'react';
import { useScene } from './useScene';
import type { THREE } from '../../lib';

export const useActiveModel = (): THREE.Group | null => {
  const orchestrator = useScene();

  return useSyncExternalStore(
    (onChange) => {
      const loaded = () => onChange();
      const removed = () => onChange();
      orchestrator.addEventListener('model::loaded' as never, loaded);
      orchestrator.addEventListener('model::removed' as never, removed);
      return () => {
        orchestrator.removeEventListener('model::loaded' as never, loaded);
        orchestrator.removeEventListener('model::removed' as never, removed);
      };
    },
    () => orchestrator.activeModel.get(),
  );
};