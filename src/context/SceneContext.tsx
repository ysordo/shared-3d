'use client';
import type { ReactNode } from 'react';
import React, { createContext, useContext, forwardRef, useEffect, useState } from 'react';
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
    const [orchestrator, setOrchestrator] = useState<SceneOrchestrator | null>(null);

    useEffect(() => {
      if (!ref) {
        return;
      }

      if (typeof ref === 'function') {
        throw new Error(
          'SceneProvider no soporta ref como función. Usa useRef()'
        );
      }

      if (!ref.current) {
        console.warn('SceneProvider: canvas ref no está asignado aún');
        return;
      }

      setOrchestrator((prev) => {
        if (prev) {
          return prev;
        }
        return SceneOrchestrator.getInstance(ref.current ?? undefined, config);
      });

      if (process.env.NODE_ENV === 'development') {
        (window as any).__ORCHESTRATOR__ = orchestrator;
      }
    }, [ref, config]);

    return (
      <SceneContext.Provider value={{ orchestrator: orchestrator as any }}>
        {children}
      </SceneContext.Provider>
    );
  }
);

SceneProvider.displayName = 'SceneProvider';

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
