'use client';

import { useEffect, useRef } from 'react';
import { useScene } from './useScene';
import { RaycasterPlugin } from '../core/orchestrator/plugins/RaycasterPlugin';
import type { RaycasterEvent } from '../core/orchestrator/plugins';

export const useRaycaster = (
  onEvent: (event: RaycasterEvent) => void
) => {
  const orchestrator = useScene();
  const pluginRef = useRef<RaycasterPlugin | null>(null);

  useEffect(() => {
    if(!orchestrator) {return;}
    if (pluginRef.current) {
      // Actualizar callback si cambia
      pluginRef.current.updateCallback(onEvent);
      return;
    }

    const plugin = new RaycasterPlugin(onEvent);
    pluginRef.current = plugin;
    orchestrator.use(plugin);

    return () => {
      if (pluginRef.current) {
        orchestrator.remove(plugin.name);
        pluginRef.current = null;
      }
    };
  }, [orchestrator, onEvent]);
};