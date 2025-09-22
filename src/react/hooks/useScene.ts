'use client';
import { useSceneContext } from './SceneContext';

export const useScene = () => {
  const {sceneManager, canvas} = useSceneContext();

  return {
    canvas: canvas,
    sceneManager: sceneManager,
    isReady: !!sceneManager,
  };
};