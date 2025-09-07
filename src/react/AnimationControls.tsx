/*'use client';
import { useEffect } from 'react';
import { useSceneContext } from './SceneContext';

interface AnimationControlsProps {
  clipName: string;
  direction?: 'forward' | 'backward';
}
export function AnimationControls({ clipName, direction = 'forward' }: AnimationControlsProps): null {
  const { sceneManager } = useSceneContext();

  useEffect(() => {
    if (!sceneManager) {
      console.info('[AnimationControls] SceneManager no disponible.');
      return;
    }
    if (sceneManager.activeModelId === null) {
      console.info('[AnimationControls] No hay modelo activo.');
      return;
    }

    const manager = sceneManager.getAnimationManager();
    if (!manager) {
      console.info('[AnimationControls] No se encontró AnimationManager para el modelo activo.');
      return;
    }

    // Ejecutar la animación automáticamente cuando cambien dependencias
    if (!manager.isBusy()) {
      manager.play(clipName, direction);
    }

  }, [sceneManager, sceneManager?.activeModelId, clipName, direction]);

  return null;
}
*/
