'use client';
import type React from 'react';
import { useEffect } from 'react';
import { GLTFLoader } from '../../core/loaders/GLTFLoader';
import type { ModelManifest } from '../../core/cache/types';

type ModelPreloadProps = {
  entries: ModelManifest;
  draco?: boolean;
  onProgress?: (completed: number, total: number) => void
};

export const ModelPreload: React.FC<ModelPreloadProps> = ({
  entries,
  draco = false,
  onProgress,
}) => {
  useEffect(() => {
    GLTFLoader.preload(entries, {draco}, onProgress);
  }, [entries, draco, onProgress]);

  return null;
};
