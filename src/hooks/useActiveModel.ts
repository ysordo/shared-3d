'use client';
import { useScene } from './useScene';
import type * as THREE from 'three';

export const useActiveModel = (): THREE.Group | null => {
  const orchestrator = useScene();
  return orchestrator.getActiveModel();
};