/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import type { ModelManifestEntry } from '../../core/cache/types';

type HDRIProps = {
  entry: ModelManifestEntry;
};

export const HDRI: React.FC<HDRIProps> = ({ entry }) => {
  const orchestrator = useScene();

  useEffect(() => {
    orchestrator.setHDRI(entry);
  }, [entry.id]);

  return null;
};
