'use client';
import type React from 'react';
import { useEffect } from 'react';
import { GLTFLoader } from '../../core/loaders/GLTFLoader';
import type { ModelManifest } from '../../core/cache/types';

type ModelPreloadProps = {
  entries: ModelManifest;
  draco?: boolean;
};

export const ModelPreload: React.FC<ModelPreloadProps> = ({
  entries,
  draco = false,
}) => {
  useEffect(() => {
    entries.forEach((entry) => {
      GLTFLoader.load(entry, { draco }).catch(() => {});
    });
  }, [entries, draco]);

  return null;
};
