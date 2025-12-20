'use client';
import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useScene } from '../../hooks/useScene';
import type { ManifestEntry } from '../../core/cache/types';
import type { HDRILoaderOptions, THREE } from '../../lib';

type HDRIProps = {
  entry: ManifestEntry;
  onLoaded?: (event: {
    texture: THREE.Texture;
    entry: ManifestEntry;
    config: any;
  }) => void;
  onProgress?: (event: { progress: any; entry: ManifestEntry }) => void;
  onError?: (event: { error: Error; entry: ManifestEntry }) => void;
} & Partial<
  Omit<HDRILoaderOptions, 'dataType' | 'preserveHDR' | 'rgbeLoaderOptions'>
>;

export const HDRI: React.FC<HDRIProps> = ({
  entry,
  exposure=1.0,
  maxLuminance=16.0,
  onLoaded,
  onProgress,
  onError,
}) => {
  const orch = useScene();
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
      orch.addEventListener(
        'hdri::loaded' as never,
        handleHDRIEvent as EventListener
      );
      orch.addEventListener(
        'hdri::progress' as never,
        handleHDRIEvent as EventListener
      );
      orch.addEventListener(
        'hdri::error' as never,
        handleHDRIEvent as EventListener
      );

      isHandle.current = true;
    }
    if (isHandle.current) {
      if (orch.getActiveHDRI()?.name !== entry.id && !isloaded.current) {
        isloaded.current = false;
        orch.setHDRI(entry, {exposure, maxLuminance}).catch(console.error);
      }
    }
    return () => {
      isHandle.current = false;

      orch.removeEventListener(
        'hdri::loaded' as never,
        handleHDRIEvent as EventListener
      );
      orch.removeEventListener(
        'hdri::progress' as never,
        handleHDRIEvent as EventListener
      );
      orch.removeEventListener(
        'hdri::error' as never,
        handleHDRIEvent as EventListener
      );
      orch.clearHDRI();
      isloaded.current = false;
    };
  }, [entry.id, exposure, handleHDRIEvent, maxLuminance, orch]);

  return null;
};
