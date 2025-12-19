'use client';
import type React from 'react';
import { useMemo } from 'react';
import { GLTFLoader } from '../../core/loaders/GLTFLoader';
import type { ModelManifest } from '../../core/cache/types';
import { usePreloadEffect } from '../../hooks/usePreloadEffect';

type ModelPreloadProps = {
  entries: ModelManifest;
  draco?: boolean;
  onProgress?: (completed: number, total: number) => void;
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
    GLTFLoader.preload(data.entries, { draco: data.draco }, (...prev) => {
      preload.set(prev[1].id, prev[0]);
      onProgress?.(prev[2], prev[3]);
    });
  }, deps);

  return null;
};
