'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import type { ManifestEntry } from '../../core/cache/types';

type HDRIProps = {
  entry: ManifestEntry;
};

export const HDRI: React.FC<HDRIProps> = ({ entry }) => {
  const orchestrator = useScene();

  useEffect(() => {
    orchestrator.setHDRI(entry);
  }, [entry.id]);

  return null;
};
