'use client';

import { usePreload } from './usePreload';
import type { ManifestEntry } from '../core/cache/types';
import type { THREE } from '../lib';

export const useModelSuspense = (entry: ManifestEntry): THREE.Group => {
  const preload = usePreload<'map'>();

  const model = preload.get(entry.id);

  if (!model) {
    throw new Promise<void>((resolve) => {
      const check = () => {
        const m = preload.get(entry.id);
        if (m) {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      check();
    });
  }

  return model;
};