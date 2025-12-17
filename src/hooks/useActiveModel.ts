'use client';
import { useSceneContext } from '../context/SceneContext';
import type { THREE } from '../lib';

export const useActiveModel = (): THREE.Group | null => useSceneContext().activeModel;