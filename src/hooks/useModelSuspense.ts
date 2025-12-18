'use client';

import { usePreload } from './usePreload';
import type { ManifestEntry } from '../lib/types';
import type { THREE } from '../lib';
import { useEffect, useRef } from 'react';

export const useModelSuspense = (entry: ManifestEntry): THREE.Group | undefined => {
  const preload = usePreload<'map'>();
  const model = useRef<THREE.Group | undefined>(undefined);

  useEffect(()=>{
    if(!preload){return;}
    model.current = preload.get(entry.id);
  
    if (!model.current) {
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

  }, [preload]);

  return model.current;
};