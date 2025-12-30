'use client';

import type { ManifestEntry } from '../../lib/types';
import type { THREE } from '../../lib';
import { useEffect, useRef } from 'react';
import { usePreload } from './usePreload';

export const useModelSuspense = (entry: ManifestEntry): THREE.Group | undefined => {
  const { getPreloaded } = usePreload();
  const model = useRef<THREE.Group | undefined>(undefined);

  useEffect(()=>{
    model.current = getPreloaded(entry.id);
  
    if (!model.current) {
      throw new Promise<void>((resolve) => {
        const check = () => {
          const m = getPreloaded(entry.id);
          if (m) {
            resolve();
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      });
    }

  }, [entry.id]);

  return model.current;
};