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
} & React.CanvasHTMLAttributes<HTMLCanvasElement>;

export const SceneProvider = forwardRef<HTMLCanvasElement, SceneProviderProps>(
  ({ children, config, ...props }, forwardedRef) => {
    const internalCanvasRef = useRef<HTMLCanvasElement>(null);
    const canvas = (
      (forwardedRef ?? internalCanvasRef) as React.RefObject<HTMLCanvasElement>
    ).current;

    const orchestratorRef = useRef<SceneOrchestrator | null>(null);
    const activeModelRef = useRef<THREE.Group | null>(null);
    const preloadRef = useRef<Map<string, THREE.Group>>(new Map());

    useEffect(() => {
      if (!canvas || orchestratorRef.current) {
        return;
      }

      const orchestrator = SceneOrchestrator.getInstance(canvas, config);
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
    }, [canvas, config, forwardedRef, internalCanvasRef]);

    const value = useMemo<SceneContextValue | null>(() => {
      if (!orchestratorRef.current) {
        return null;
      }
      return {
        orchestrator: orchestratorRef.current,
        activeModel: activeModelRef.current,
        preload: preloadRef.current,
      };
    }, [orchestratorRef]);

    return (
      <SceneContext.Provider value={value}>
        <canvas ref={forwardedRef ?? internalCanvasRef} {...props} />
        {children}
      </SceneContext.Provider>
    );
  }
);

SceneProvider.displayName = 'SceneProvider';

export const useSceneContext = (): SceneContextValue | null => {
  const context = useContext(SceneContext);
  return context;
};
