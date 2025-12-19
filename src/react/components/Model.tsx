'use client';

import { useRef } from 'react';
import { useScene } from '../../hooks/useScene';
import type { ManifestEntry } from '../../core/cache/types';
import type { GLTFLoaderEvents } from '../../core/loaders/GLTFLoader';
import { GLTFLoader } from '../../core/loaders/GLTFLoader';
import { useActiveModel } from '../../hooks';
import { usePreloadEffect } from '../../hooks/usePreloadEffect';

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
  const model = useActiveModel();
  const cancelledRef = useRef(false);

  usePreloadEffect(
    (preload) => {
      if (!model || entry.id !== model.name) {
        cancelledRef.current = false;

        const t = preload.get(entry.id);
        if (t) {
          if (cancelledRef.current) {
            return;
          }
          orchestrator.setModel(t);
          onLoaded?.(t, entry);
          return;
        }

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
      }

      return () => {
        cancelledRef.current = true;
        orchestrator.removeModel();
      };
    },
    [entry.id, draco, orchestrator, onLoaded, onProgress, onError, model]
  );

  if (!model || !children) {
    return null;
  }

  return children(model);
};
