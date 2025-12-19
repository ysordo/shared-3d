'use client';
import type { ReactNode } from 'react';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useState,
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
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export const SceneProvider: React.FC<SceneProviderProps> = ({
  children,
  config,
  canvasRef,
}) => {
  const [orchestratorRef, setOrchestratorRef] =
    useState<SceneOrchestrator | null>(null);
  const activeModelRef = useRef<THREE.Group | null>(null);
  const preloadRef = useRef<Map<string, THREE.Group>>(new Map());

  useEffect(() => {
    if (!canvasRef.current || orchestratorRef) {
      return;
    }

    const orchestrator = SceneOrchestrator.getInstance(
      canvasRef.current,
      config
    );
    setOrchestratorRef(orchestrator);

    const updateActiveModel = () => {
      activeModelRef.current = orchestrator.getActiveModel();
    };
    orchestrator.addEventListener('model::loaded' as never, updateActiveModel);
    orchestrator.addEventListener('model::removed' as never, updateActiveModel);

    if (process.env.NODE_ENV === 'development') {
      (window as any).__ORCHESTRATOR__ = orchestratorRef;
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
      setOrchestratorRef(null);
      activeModelRef.current = null;
      preloadRef.current.clear();
    };
  }, [config, canvasRef]);

  const value = useMemo<SceneContextValue | null>(() => {
    if (!orchestratorRef) {
      return null;
    }
    return {
      orchestrator: orchestratorRef,
      activeModel: activeModelRef.current,
      preload: preloadRef.current,
    };
  }, [orchestratorRef]);

  return (
    <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
  );
};

export const useSceneContext = (): SceneContextValue => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error(
      'useSceneContext must be used within a <SceneProvider>. ' +
        'Make sure your component is wrapped by the SceneProvider component.'
    );
  }
  return context;
};
