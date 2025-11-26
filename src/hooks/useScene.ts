'use client';
import { useScene as useSceneContext } from '../context/SceneContext';
import type { SceneOrchestrator } from '../core/orchestrator/SceneOrchestrator';

export const useScene = (): SceneOrchestrator => {
  return useSceneContext();
};