'use client';
import type React from 'react';
import { useEffect } from 'react';
import { GLTFLoader } from '../../core/loaders/GLTFLoader';
import type { ModelManifest } from '../../core/cache/types';
import { usePreload } from '../../hooks/usePreload';

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
  const preload = usePreload();
  useEffect(() => {
    GLTFLoader.preload(entries, { draco }, (...prev) => {
      preload.set(prev[1].id, prev[0]);
      onProgress?.(prev[2], prev[3]);
    });
  }, [entries, draco, onProgress]);

  return null;
};
