/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import type { ModelManifestEntry } from '../../core/cache/types';

type ModelProps = {
  entry: ModelManifestEntry;
  draco?: boolean;
};

export const Model: React.FC<ModelProps> = ({ entry, draco = false }) => {
  const orchestrator = useScene();

  useEffect(() => {
    orchestrator.setModel(entry, { draco });
  }, [entry.id, draco]);

  return null;
};
