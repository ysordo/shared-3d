/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ReactNode } from 'react';
import React, { createContext, useContext, forwardRef, useEffect } from 'react';
import { SceneOrchestrator } from '../core/orchestrator/SceneOrchestrator';
import type { SceneConfig } from '../core/orchestrator/SceneOrchestrator';

type SceneContextValue = {
  orchestrator: SceneOrchestrator;
};

const SceneContext = createContext<SceneContextValue | null>(null);

type SceneProviderProps = {
  children: ReactNode;
  config?: SceneConfig | undefined;
};

export const SceneProvider = forwardRef<HTMLCanvasElement, SceneProviderProps>(
  ({ children, config }, ref) => {
    useEffect(() => {
      // Validamos cuando el ref esté listo
      if (!ref) {
        return;
      }

      // Si es función (ref callback), no tiene .current
      if (typeof ref === 'function') {
        throw new Error(
          'SceneProvider no soporta ref como función. Usa useRef()'
        );
      }

      // Ahora sí: ref es RefObject → tiene .current
      if (!ref.current) {
        console.warn('SceneProvider: canvas ref no está asignado aún');
        return;
      }

      // ¡Aquí ya es seguro!
      const orchestrator = SceneOrchestrator.getInstance(ref.current, config);

      // Opcional: exponer en window para debug
      if (process.env.NODE_ENV === 'development') {
        (window as any).__ORCHESTRATOR__ = orchestrator;
      }
    }, [ref, config]);

    return (
      <SceneContext.Provider value={{ orchestrator: null as any }}>
        {children}
      </SceneContext.Provider>
    );
  }
);

SceneProvider.displayName = 'SceneProvider';

// Hook seguro
export const useScene = (): SceneOrchestrator => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene debe usarse dentro de <SceneProvider>');
  }
  if (!context.orchestrator) {
    throw new Error(
      'SceneOrchestrator aún no está inicializado. Asegúrate de que el canvas esté montado'
    );
  }
  return context.orchestrator;
};
