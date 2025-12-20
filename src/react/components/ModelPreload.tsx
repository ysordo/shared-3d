'use client';
import type React from 'react';
import { useMemo } from 'react';
import { GLTFLoader } from '../../core/loaders/GLTFLoader';
import type { ModelManifest } from '../../core/cache/types';
import { usePreloadEffect } from '../../hooks/usePreloadEffect';

type ModelPreloadProps = {
  entries: ModelManifest;
  draco?: boolean;
  onProgress?: (
    model: string,
    completed: number,
    total: number,
    percent?: number
  ) => void;
};

export const ModelPreload: React.FC<ModelPreloadProps> = ({
  entries,
  draco = false,
  onProgress,
}) => {
  const data = useMemo(
    () => ({ entries, draco, onProgress }),
    [entries, draco, onProgress]
  );
  const deps = useMemo(
    () => [...Object.values(data)],
    [...Object.values(data)]
  );

  usePreloadEffect((preload) => {
    GLTFLoader.preload(
      data.entries,
      { draco: data.draco },
      (obj, { id }, completed, total, percent) => {
        if (obj) {
          preload.set(id, obj);
        }
        onProgress?.(id, completed, total, percent);
      }
    );
  }, deps);

  return null;
};
