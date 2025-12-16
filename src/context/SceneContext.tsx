'use client';
import type { ReactNode } from 'react';
import React, {
  createContext,
  useContext,
  forwardRef,
  useEffect,
  useState,
  useRef,
} from 'react';
import { SceneOrchestrator } from '../core/orchestrator/SceneOrchestrator';
import type { SceneConfig } from '../core/orchestrator/SceneOrchestrator';
import type { THREE } from '../lib';

type SceneContextValue = {
  orchestrator: SceneOrchestrator;
  activeModel: THREE.Group | null;
  preload: Map<string,THREE.Group>;
};

const SceneContext = createContext<SceneContextValue | null>(null);

type SceneProviderProps = {
  children: ReactNode;
  config?: SceneConfig | undefined;
};

export const SceneProvider = forwardRef<HTMLCanvasElement, SceneProviderProps>(
  ({ children, config }, ref) => {
    const [orchestrator, setOrchestrator] = useState<SceneOrchestrator | null>(
      null
    );
    const [activeModel, setActiveModel] = useState<THREE.Group | null>(null);
    const preload = useRef<Map<string,THREE.Group>>(new Map());

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

    useEffect(() => {
      if (!orchestrator) {
        return;
      }
      const updateActiveModel = () => {
        const model = orchestrator.getActiveModel();
        setActiveModel(model);
      };
      orchestrator.addEventListener('model::loaded' as never, updateActiveModel);
      return () => {
        orchestrator.removeEventListener('model::loaded' as never, updateActiveModel);
      };
    }, [orchestrator]);

    return (
      <SceneContext.Provider
        value={{ orchestrator: orchestrator as SceneOrchestrator, activeModel, preload: preload.current }}>
        {children}
      </SceneContext.Provider>
    );
  }
);

SceneProvider.displayName = 'SceneProvider';

export const useScene = (): SceneContextValue => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene debe usarse dentro de <SceneProvider>');
  }
  if (!context.orchestrator) {
    throw new Error(
      'SceneOrchestrator aún no está inicializado. Asegúrate de que el canvas esté montado'
    );
  }
  return context;
};
