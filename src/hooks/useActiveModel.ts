'use client';
import { useScene } from './useScene';
import type { THREE } from '../lib';

export const useActiveModel = (): THREE.Group | null => {
  const orchestrator = useScene();
  return orchestrator.getActiveModel();
};