'use client';
import { useSceneContext } from '../context/SceneContext';
import type { SceneOrchestrator } from '../core/orchestrator/SceneOrchestrator';

export const useScene = (): SceneOrchestrator => useSceneContext().orchestrator;
