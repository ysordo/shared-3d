'use client';

import { useEffect, useRef } from 'react';
import { useScene } from './useScene';
import type { Plugin } from '../core/orchestrator/types';

/**
 * Hook estable para plugins.
 * 
 * - Instancia única por lifetime del componente
 * - Instalado solo si no existe
 * - Dispose solo al desmontar
 * - Configuración reactiva mediante factory (ejecutada solo al montar o si key cambia)
 * - Totalmente estable en Strict Mode y Fast Refresh
 */
export const usePlugin = <T extends Plugin>(
  factory: () => T,
  deps: React.DependencyList = []
): T | null => {
  const orchestrator = useScene();
  const pluginRef = useRef<T | null>(null);

  useEffect(() => {
    // Si ya existe con misma config, no hacer nada
    if (pluginRef.current && orchestrator.has(pluginRef.current.name)) {
      return;
    }

    // Remover si existe versión anterior (por seguridad)
    if (pluginRef.current) {
      orchestrator.remove(pluginRef.current.name);
      pluginRef.current.dispose?.();
    }

    // Crear e instalar
    const plugin = factory();
    pluginRef.current = plugin;

    if (orchestrator.has(plugin.name)) {
      console.warn(`[usePlugin] Plugin "${plugin.name}" ya existe. Sobrescribiendo.`);
      orchestrator.remove(plugin.name);
    }

    orchestrator.use(plugin);

    // Cleanup solo al desmontar
    return () => {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
    };
  }, [orchestrator, ...deps]); // NO incluir factory en deps

  return pluginRef.current;
};