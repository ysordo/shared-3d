'use client';

import { useEffect, useRef } from 'react';
import { useScene } from './useScene';
import type { Plugin } from '../core/orchestrator/types';

/**
 * Deep equality ligera (objetos planos, arrays de primitivos, anidamiento básico)
 * 
 * Suficiente para todas las configuraciones de plugins en la librería.
 * Tree-shakeable, sin dependencias externas.
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
 * Hook avanzado para gestión de plugins con ciclo de vida óptimo.
 * 
 * Corrección del bug reportado:
 * - El return del cleanup estaba dentro del if (shouldRecreate) → solo se registraba cuando se recreaba el plugin.
 * - Cuando la config no cambiaba (caso común), no había cleanup → plugin no se removía/dispose en unmount.
 * - Resultado: al volver a montar el componente, orchestrator.has(name) = true (plugin zombie) → no se instalaba nuevo.
 * 
 * Solución:
 * - Cleanup siempre registrado (fuera del if) → dispose/remove garantizado en todo unmount.
 * - Recreación solo cuando config cambia (deep equality).
 * - Hot-update cuando config cambia pero plugin soporta update().
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
      // Cleanup instancia anterior (si existe)
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
      }

      // Crear e instalar nueva instancia
      const newPlugin = factory();
      pluginRef.current = newPlugin;
      orchestrator.use(newPlugin);

      // Actualizar config de referencia
      prevConfigRef.current = config;
      if (pluginRef.current && 'update' in pluginRef.current) {
        // Hot-update sin recrear
        (pluginRef.current as any).update?.(config);
      }
    } else if (pluginRef.current && 'update' in pluginRef.current) {
      // Hot-update sin recrear
      (pluginRef.current as any).update?.(config);
    }

    // Cleanup siempre ejecutado en unmount (independiente de recreación)
    return () => {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
      prevConfigRef.current = null;
    };
  }, [orchestrator, config, ...deps]);

  return pluginRef.current;
};