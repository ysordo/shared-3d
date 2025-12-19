'use client';

import { useEffect, useRef } from 'react';
import { useScene } from './useScene';
import type { Plugin } from '../core/orchestrator/types';

type Factory<T extends Plugin> = () => T | null;

/**
 * Hook definitivo para plugins con configuración reactiva.
 * 
 * - Una instancia activa a la vez
 * - Configuración siempre fresca (recrea si deps cambian)
 * - Dispose garantizado
 * - Tree-shakeable y Strict Mode seguro
 */
export const usePlugin = <T extends Plugin>(
  factory: Factory<T>,
  deps: React.DependencyList = [],
  enabled = true
): T | null => {
  const orchestrator = useScene();
  const pluginRef = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) {
      // Si disabled, remover si existe
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
      return;
    }

    // Remover instancia anterior
    if (pluginRef.current) {
      orchestrator.remove(pluginRef.current.name);
      pluginRef.current.dispose?.();
    }
    // Crear e instalar nueva con config actual
    const plugin = factory();
    if(!plugin){return;}
    pluginRef.current = plugin;
    orchestrator.use(plugin);

    // Cleanup al cambiar deps o desmontar
    return () => {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
    };
  }, [orchestrator, enabled, factory, ...deps]);

  return pluginRef.current;
};