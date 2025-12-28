'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from 'react';
import { SceneOrchestrator } from '../core/orchestrator/SceneOrchestrator';
import type { SceneConfig } from '../core/orchestrator/SceneOrchestrator';
import type { THREE } from '../lib';

type SceneContextValue = {
  orchestrator: SceneOrchestrator;

  /** Precarga un modelo y lo añade al mapa interno */
  preloadModel: (id: string, model: THREE.Group) => void;

  /** Remueve un modelo precargado */
  removePreloaded: (id: string) => void;

  /** Obtiene un modelo precargado (solo lectura) */
  getPreloaded: (id: string) => THREE.Group | undefined;

  /** Mapa completo de precargados (solo lectura, shallow copy para seguridad) */
  preloadedModels: ReadonlyMap<string, THREE.Group>;
};

const SceneContext = createContext<SceneContextValue | undefined>(undefined);

type SceneProviderProps = {
  children: React.ReactNode;
  config?: SceneConfig | undefined;
};

export const SceneProvider = forwardRef<HTMLCanvasElement, SceneProviderProps>(
  ({ children, config }, ref) => {
    const [orchestrator, setOrchestrator] = useState<SceneOrchestrator | null>(null);
    const preloadRef = useRef<Map<string, THREE.Group>>(new Map());

    // Estado derivado para forzar re-renders si alguien usa usePreloadedModels()
    const [, forceUpdate] = useState({});

    useEffect(() => {
      if (!ref || typeof ref === 'function' || !ref.current || orchestrator) {return;}

      const canvas = ref.current;
      const orch = SceneOrchestrator.getInstance(canvas, config);
      setOrchestrator(orch);

    }, [ref, config, orchestrator]);

    const contextValue = useMemo<SceneContextValue | undefined>(() => {
      if (!orchestrator) {return undefined;}

      const preloadModel = (id: string, model: THREE.Group) => {
        preloadRef.current.set(id, model);
        forceUpdate({}); // Trigger re-render para hooks reactivos
      };

      const removePreloaded = (id: string) => {
        preloadRef.current.delete(id);
        forceUpdate({});
      };

      const getPreloaded = (id: string) => preloadRef.current.get(id);

      const preloadedModels = new Map(preloadRef.current); // Shallow copy readonly

      return {
        orchestrator,
        preloadModel,
        removePreloaded,
        getPreloaded,
        preloadedModels: Object.freeze(preloadedModels),
      };
    }, [orchestrator]);

    return (
      <SceneContext.Provider value={contextValue}>
        {children}
      </SceneContext.Provider>
    );
  }
);

SceneProvider.displayName = 'SceneProvider';

export const useSceneContext = (): SceneContextValue => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useSceneContext must be used within a SceneProvider');
  }
  return context;
};

// Alias convenientes
export const useScene = (): SceneOrchestrator => useSceneContext().orchestrator;

export const usePreload = () => {
  const { preloadModel, removePreloaded, getPreloaded, preloadedModels } = useSceneContext();
  return { preloadModel, removePreloaded, getPreloaded, preloadedModels };
};