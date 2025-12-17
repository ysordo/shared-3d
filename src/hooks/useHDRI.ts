'use client';

import { useEffect, useState, useRef } from 'react';
import { useScene } from './useScene';
import type { ManifestEntry } from '../core/cache/types';
import type { THREE } from '../lib';

export const useHDRI = (entry: ManifestEntry | null) => {
  const orchestrator = useScene();
  const [hdri, setHDRI] = useState<THREE.Texture | null>(null);
  const [loading, setLoading] = useState(false);
  const currentEntryRef = useRef<ManifestEntry | null>(null);
  const abortRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!entry) {
      setHDRI(null);
      setLoading(false);
      return;
    }

    // Cancelar carga anterior si cambia entry
    abortRef.current();

    currentEntryRef.current = entry;
    setLoading(true);

    let cancelled = false;
    abortRef.current = () => {
      cancelled = true;
    };

    orchestrator
      .setHDRI(entry)
      .then((tex) => {
        if (cancelled || currentEntryRef.current?.id !== entry.id) {return;}
        setHDRI(tex);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) {return;}
        console.error('[useHDRI] Error loading HDRI:', err);
        setLoading(false);
      });

    return () => {
      abortRef.current();
    };
  }, [entry?.id, orchestrator]);

  const clear = () => {
    orchestrator.clearHDRI();
    setHDRI(null);
  };

  return { hdri, loading, clear };
};