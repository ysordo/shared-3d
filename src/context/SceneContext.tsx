'use client';
import type { ReactNode } from 'react';
import React, {
  createContext,
  useContext,
  forwardRef,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import { SceneOrchestrator } from '../core/orchestrator/SceneOrchestrator';
import type { SceneConfig } from '../core/orchestrator/SceneOrchestrator';
import type { THREE } from '../lib';

type SceneContextValue = {
  orchestrator: SceneOrchestrator;
  activeModel: THREE.Group | null;
  preload: Map<string, THREE.Group>;
};

const SceneContext = createContext<SceneContextValue | null>(null);

type SceneProviderProps = {
  children: ReactNode;
  config?: SceneConfig | undefined;
};

export const SceneProvider = forwardRef<HTMLCanvasElement, SceneProviderProps>(
  ({ children, config }, ref) => {
    const orchestratorRef = useRef<SceneOrchestrator | null>(null);
    const activeModelRef = useRef<THREE.Group | null>(null);
    const preloadRef = useRef<Map<string, THREE.Group>>(new Map());

    useEffect(() => {
      if (!ref || orchestratorRef.current) {
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

      const orchestrator = SceneOrchestrator.getInstance(ref.current, config);
      orchestratorRef.current = orchestrator;

      const updateActiveModel = () => {
        activeModelRef.current = orchestrator.getActiveModel();
      };
      orchestrator.addEventListener(
        'model::loaded' as never,
        updateActiveModel
      );
      orchestrator.addEventListener(
        'model::removed' as never,
        updateActiveModel
      );

      if (process.env.NODE_ENV === 'development') {
        (window as any).__ORCHESTRATOR__ = orchestratorRef.current;
      }
      return () => {
        orchestrator.removeEventListener(
          'model::loaded' as never,
          updateActiveModel
        );
        orchestrator.removeEventListener(
          'model::removed' as never,
          updateActiveModel
        );
        orchestrator.dispose();
        orchestratorRef.current = null;
        activeModelRef.current = null;
        preloadRef.current.clear();
      };
    }, [ref, config]);

    const value = useMemo<SceneContextValue>(() => {
      if (!orchestratorRef.current) {
        throw new Error(
          'SceneOrchestrator no inicializado. Asegúrate de que el canvas esté montado.'
        );
      }
      return {
        orchestrator: orchestratorRef.current,
        activeModel: activeModelRef.current,
        preload: preloadRef.current,
      };
    }, []);

    return (
      <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
    );
  }
);

SceneProvider.displayName = 'SceneProvider';

export const useSceneContext = (): SceneContextValue => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene debe usarse dentro de <SceneProvider>');
  }
  return context;
};
