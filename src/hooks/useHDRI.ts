'use client';
import { useEffect, useState } from 'react';
import { useScene } from './useScene';
import type { ManifestEntry } from '../core/cache/types';
import type { THREE } from '../lib';

export const useHDRI = (entry: ManifestEntry | null) => {
  const orchestrator = useScene();
  const [hdri, setHDRI] = useState<THREE.Texture | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!entry) {return;}

    setLoading(true);
    orchestrator
      .setHDRI(entry)
      .then((tex) => {
        setHDRI(tex);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [entry?.id]);

  const clear = () => orchestrator.clearHDRI();

  return { hdri, loading, clear };
};