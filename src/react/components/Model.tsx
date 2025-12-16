'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useScene } from '../../hooks/useScene';
import type { ManifestEntry } from '../../core/cache/types';
import type { THREE } from '../../lib';
import type { GLTFLoaderEvents } from '../../core';
import { usePreload } from '../../hooks/usePreload';

type ModelProps = {
  entry: ManifestEntry;
  draco?: boolean | undefined;
  children?: (model: THREE.Group) => React.ReactNode;
};

export const Model: React.FC<ModelProps & GLTFLoaderEvents> = ({
  entry,
  draco = false,
  onLoaded,
  onProgress,
  onError,
  children,
}) => {
  const orchestrator = useScene();
  const preload = usePreload();
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    let cancelled = false;
    let template = entry;
    const temp = preload.get(entry.id);
    if(temp) {
      template = {
        obj: temp,
        manifest: entry,
      } as any;
    }
    orchestrator.setModel(template, {
      draco,
      onLoaded: (...prev) => {
        if (cancelled) {
          return;
        }
        setModel(prev[0]);
        onLoaded?.(...prev);
      },
      onProgress: (...prev) => {
        if (cancelled) {
          return;
        }
        onProgress?.(...prev);
      },
      onError: (...prev) => {
        if (cancelled) {
          return;
        }
        onError?.(...prev);
      },
    });
    return () => {
      cancelled = true;
      setModel(null);
      orchestrator.removeModel();
    };
  }, [entry.id, draco, orchestrator, entry]);
  if (!model) {
    return null;
  }
  return children?.(model);
};
