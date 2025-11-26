'use client';
import { useEffect } from 'react';
import { useScene } from './useScene';
import { RaycasterPlugin, type RaycasterEvent } from '../core/orchestrator/plugins';

export const useRaycaster = (onEvent: (event: RaycasterEvent) => void) => {
  const orchestrator = useScene();

  useEffect(() => {
    const plugin = new RaycasterPlugin(onEvent);
    orchestrator.use(plugin);

    return () => {
      // Opcional: remover plugin
    };
  }, [onEvent]);
};