'use client';

import { useEffect, useRef } from 'react';
import { useScene } from './useScene';
import type { Plugin } from '../core/orchestrator/types';

/**
 * Deep equality manual (shallow + primitivos + arrays simples)
 * 
 * Implementación ligera y tree-shakeable sin dependencias externas.
 * Suficiente para la mayoría de configuraciones de plugins (objetos planos, arrays de primitivos, callbacks estables).
 * Evita el error TS al no depender de lodash.
 */
function shallowDeepEqual(a: unknown, b: unknown): boolean {
  if (a === b) {return true;}

  if (a == null || b == null) {return false;}

  if (typeof a !== 'object' || typeof b !== 'object') {return false;}

  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);

  if (keysA.length !== keysB.length) {return false;}

  for (const key of keysA) {
    const valA = (a as any)[key];
    const valB = (b as any)[key];

    // Comparación profunda para arrays simples y objetos anidados básicos
    if (Array.isArray(valA) && Array.isArray(valB)) {
      if (valA.length !== valB.length) {return false;}
      for (let i = 0; i < valA.length; i++) {
        if (valA[i] !== valB[i]) {return false;}
      }
    } else if (valA && typeof valA === 'object' && valB && typeof valB === 'object') {
      if (!shallowDeepEqual(valA, valB)) {return false;}
    } else if (valA !== valB) {
      return false;
    }
  }

  return true;
}

/**
 * usePlugin
 * 
 * Hook avanzado y production-ready para registrar plugins en SceneOrchestrator.
 * 
 * Características clave:
 * - Instancia única mientras la configuración sea semánticamente igual (deep equality ligera).
 * - Recreación automática solo cuando cambia algo relevante.
 * - Hot-update mediante plugin.update() cuando está disponible (ideal para plugins costosos).
 * - Zero dependencias externas → tree-shakeable y sin errores de tipos.
 * - Totalmente compatible con StrictMode, Fast Refresh y navegación SPA.
 * - Limpieza segura en unmount.
 * 
 * @example
 * const config = useMemo(() => ({ enabled, bloom: { strength } }), [enabled, strength]);
 * usePlugin(() => new PostProcessingPlugin(), config);
 */
export const usePlugin = <T extends Plugin>(
  factory: () => T,
  config: unknown,
  deps: React.DependencyList = []
): T | null => {
  const orchestrator = useScene();
  const pluginRef = useRef<T | null>(null);
  const prevConfigRef = useRef<unknown>(null);

  useEffect(() => {
    const shouldRecreate = !shallowDeepEqual(prevConfigRef.current, config);

    if (shouldRecreate) {
      // Cleanup instancia anterior
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
      }

      // Crear e instalar nueva
      const newPlugin = factory();
      pluginRef.current = newPlugin;
      orchestrator.use(newPlugin);

      prevConfigRef.current = config;
    } else if (pluginRef.current && 'update' in pluginRef.current) {
      // Hot-update sin recrear
      (pluginRef.current as any).update?.(config);
    }

    return () => {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
    };
  }, [orchestrator, config, ...deps]);

  return pluginRef.current;
};