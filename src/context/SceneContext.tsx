'use client';
import type { ReactNode } from 'react';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useState,
  forwardRef,
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
  fallback?: ReactNode;
};

export const SceneProvider = forwardRef<HTMLCanvasElement, SceneProviderProps>(
  ({ children, config, fallback = null }, ref) => {
    const [orchestrator, setOrchestrator] = useState<SceneOrchestrator | null>(
      null
    );
    const [activeModel, setActiveModel] = useState<THREE.Group | null>(null);
    const preload = useRef<Map<string, THREE.Group>>(new Map());

    useEffect(() => {
      if (!ref || !(ref as React.RefObject<HTMLCanvasElement>).current) {
        return;
      }
      if (orchestrator) {
        return;
      }

      const canvas = (ref as React.RefObject<HTMLCanvasElement>).current!;
      const orch = SceneOrchestrator.getInstance(canvas, config);
      setOrchestrator(orch);

      const updateActiveModel = () => setActiveModel(orch.getActiveModel());
      orch.addEventListener('model::loaded' as never, updateActiveModel);
      orch.addEventListener('model::removed' as never, updateActiveModel);

      return () => {
        orch.removeEventListener('model::loaded' as never, updateActiveModel);
        orch.removeEventListener('model::removed' as never, updateActiveModel);
        orch.dispose();
      };
    }, [ref, config]);

    const value = useMemo<SceneContextValue | null>(() => {
      if (!orchestrator) {
        return null;
      }
      return {
        orchestrator: orchestrator,
        activeModel: activeModel,
        preload: preload.current,
      };
    }, [orchestrator, activeModel]);

    if (!value) {
      return <>{fallback}</>;
    }
    return (
      <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
    );
  }
);

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
