'use client';

import { useEffect, useRef } from 'react';
import { useScene } from '../../hooks/useScene';
import type { ManifestEntry } from '../../core/cache/types';
import type { GLTFLoaderEvents } from '../../core/loaders/GLTFLoader';
import { GLTFLoader } from '../../core/loaders/GLTFLoader';
import { useActiveModel } from '../../hooks';

type ModelProps = {
  entry: ManifestEntry;
  draco?: boolean | undefined;
  children?: (model: any) => React.ReactNode | undefined;
} & Partial<GLTFLoaderEvents>;

export const Model: React.FC<ModelProps> = ({
  entry,
  draco = false,
  children,
  onLoaded,
  onProgress,
  onError,
}) => {
  const orchestrator = useScene();
  const cancelledRef = useRef(false);

  useEffect(() => {
    if(!orchestrator){return;}
    cancelledRef.current = false;

    GLTFLoader.load(entry, {
      draco,
      onLoaded: (obj, manifestEntry) => {
        if (cancelledRef.current) {
          return;
        }
        orchestrator.setModel(obj);
        onLoaded?.(obj, manifestEntry);
      },
      onProgress: (...args) => {
        if (cancelledRef.current) {
          return;
        }
        onProgress?.(...args);
      },
      onError: (...args) => {
        if (cancelledRef.current) {
          return;
        }
        onError?.(...args);
      },
    });

    return () => {
      cancelledRef.current = true;
      orchestrator.removeModel();
    };
  }, [entry.id, draco, orchestrator]);

  const model = useActiveModel();
  if (!model || !children) {
    return null;
  }

  return children(model);
};
