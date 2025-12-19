'use client';
import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useScene } from '../../hooks/useScene';
import type { ManifestEntry } from '../../core/cache/types';
import type { HDRILoaderOptions, THREE } from '../../lib';

type HDRIProps = {
  entry: ManifestEntry;
  config?: Partial<
    Omit<HDRILoaderOptions, 'dataType' | 'preserveHDR' | 'rgbeLoaderOptions'>
  >;
  onLoaded?: (event: {
    texture: THREE.Texture;
    entry: ManifestEntry;
    config: any;
  }) => void;
  onProgress?: (event: { progress: any; entry: ManifestEntry }) => void;
  onError?: (event: { error: Error; entry: ManifestEntry }) => void;
};

export const HDRI: React.FC<HDRIProps> = ({
  entry,
  config = {},
  onLoaded,
  onProgress,
  onError,
}) => {
  const orchestrator = useScene();
  const isHandle = useRef(false);
  const isloaded = useRef(false);

  const handleHDRIEvent = useCallback(
    (event: any) => {
      if (event.entry?.id !== entry.id) {
        return;
      }

      switch (event.type) {
        case 'hdri::loaded':
          onLoaded?.({
            texture: event.texture,
            entry: event.entry,
            config: event.config,
          });
          break;

        case 'hdri::progress':
          onProgress?.({
            progress: event.progress,
            entry: event.entry,
          });
          isloaded.current = true;
          break;

        case 'hdri::error':
          onError?.({
            error: event.error,
            entry: event.entry,
          });
          break;
      }
    },
    [entry.id, onLoaded, onProgress, onError]
  );

  useEffect(() => {
    if (!isHandle.current) {
      orchestrator.addEventListener(
        'hdri::loaded' as never,
        handleHDRIEvent as EventListener
      );
      orchestrator.addEventListener(
        'hdri::progress' as never,
        handleHDRIEvent as EventListener
      );
      orchestrator.addEventListener(
        'hdri::error' as never,
        handleHDRIEvent as EventListener
      );

      isHandle.current = true;
    }
    if (isHandle.current) {
      if (
        orchestrator.getActiveHDRI()?.name !== entry.id &&
        !isloaded.current
      ) {
        isloaded.current = false;
        orchestrator.setHDRI(entry, config).catch(console.error);
      }
    }
    return () => {
      isHandle.current = false;

      orchestrator.removeEventListener(
        'hdri::loaded' as never,
        handleHDRIEvent as EventListener
      );
      orchestrator.removeEventListener(
        'hdri::progress' as never,
        handleHDRIEvent as EventListener
      );
      orchestrator.removeEventListener(
        'hdri::error' as never,
        handleHDRIEvent as EventListener
      );
      orchestrator.clearHDRI();
      isloaded.current = false;
    };
  }, [config, entry.id, handleHDRIEvent, orchestrator]);

  return null;
};
