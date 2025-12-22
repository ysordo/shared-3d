'use client';

import { useEffect, useState } from 'react';
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
 * Hook avanzado para gestión de plugins con ciclo de vida óptimo y separación clara.
 * 
 * Comportamiento en cambio de página (Next.js App Router o SPA):
 * - El SceneOrchestrator es singleton global (provider persistente).
 * - Al navegar a otra página:
 *   • Componente se desmonta → cleanup ejecutado → plugin.dispose() + orchestrator.remove(name).
 *   • Plugin eliminado del orchestrator → zero zombies.
 * - Al volver o ir a nueva página con mismo plugin:
 *   • Nuevo mount → effect 1 crea e instala instancia fresca.
 *   • Config inicial aplicada (factory recibe valores actuales).
 *   • effect 2 aplica hot-updates si config cambia después.
 * - Resultado: plugin siempre instalado con valores de la página actual.
 * 
 * @example
 * // En Página A
 * <PostProcessing strength={1.0} />
 * 
 * // Navegar a Página B
 * <PostProcessing strength={2.5} /> → nueva instancia con strength=2.5
 */
export const usePlugin = <T extends Plugin>(
  factory: () => T,
  config: unknown,
  deps: React.DependencyList = []
): T | undefined => {
  const orchestrator = useScene();
  const [name, setName] = useState<string>('');

  // === EFFECT 1: Creación única + instalación + cleanup en unmount ===
  useEffect(() => {
    // Cleanup previo (seguridad si orchestrator cambia o hot-reload)
    if (orchestrator.has(name)) {
      orchestrator.plugin<T>(name)?.dispose?.();
      orchestrator.remove(name);
    }

    // Crear e instalar instancia única
    const plugin = factory();
    setName(plugin.name);
    orchestrator.use(plugin);

    // Cleanup garantizado en unmount (cambio de página)
    return () => {

      if (orchestrator.has(name)) {
        orchestrator.plugin(name)?.dispose?.();
        orchestrator.remove(name);
      }
      setName('');
    };
  }, [orchestrator, factory]); // factory incluido para recrear si cambia (raro, pero seguro)

  // === EFFECT 2: Hot-update de configuración ===
  useEffect(() => {
    if (!orchestrator.has(name)) {return;}
    const temp = orchestrator.plugin<T>(name) as T;
    // Aplicar config inicial o cambios
    if ('update' in temp) {
      temp.update?.(config);
    }
  }, [config, ...deps]);

  return orchestrator.plugin<T>(name);
};