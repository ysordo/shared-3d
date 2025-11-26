'use client';
import { useEffect, useState } from 'react';
import { useScene } from './useScene';
import type { ModelManifestEntry } from '../core/cache/types';
import type * as THREE from 'three';

type UseModelOptions = {
  draco?: boolean;
  autoLoad?: boolean;
};

export const useModel = (
  entry: ModelManifestEntry | null,
  options: UseModelOptions = {}
) => {
  const { draco = false, autoLoad = true } = options;
  const orchestrator = useScene();
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!entry || !autoLoad) {return;}

    setLoading(true);
    setError(null);

    orchestrator
      .setModel(entry, { draco })
      .then((m) => {
        setModel(m);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [entry?.id, draco]);

  const load = () => entry && orchestrator.setModel(entry, { draco });

  return { model, loading, error, load };
};