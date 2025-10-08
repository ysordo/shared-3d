'use client';
import { useEffect } from 'react';
import { useSceneContext } from '../hooks/SceneContext';
import type { THREE } from '../..';

interface RaycasterProps {
  enabled?: boolean;
  onObjectClick?: (
    object: THREE.Object3D,
    point: THREE.Vector3,
    distance: number,
    originalEvent?: Event
  ) => void;
  onObjectHoverIn?: (
    object: THREE.Object3D,
    point: THREE.Vector3,
    distance: number,
    originalEvent?: Event
  ) => void;
  onObjectHoverOut?: (object: THREE.Object3D, originalEvent?: Event) => void;
  onObjectHoverMove?: (
    object: THREE.Object3D,
    point: THREE.Vector3,
    distance: number,
    originalEvent?: Event
  ) => void;
}

export function Raycaster({
  enabled = true,
  onObjectClick,
  onObjectHoverIn,
  onObjectHoverOut,
  onObjectHoverMove,
}: RaycasterProps): null {
  const { sceneManager } = useSceneContext();

  useEffect(() => {
    if (!sceneManager) {
      console.info('[Raycaster] SceneManager is not available.');
      return;
    }

    const raycasterManager = sceneManager.raycasterManager;
    if (!raycasterManager) {
      console.info('[Raycaster] RaycasterManager is not available.');
      return;
    }

    // Configurar event listeners
    const clickHandler = (event: any) => {
      onObjectClick?.(
        event.object,
        event.point,
        event.distance,
        event.originalEvent
      );
    };

    const hoverInHandler = (event: any) => {
      onObjectHoverIn?.(
        event.object,
        event.point,
        event.distance,
        event.originalEvent
      );
    };

    const hoverOutHandler = (event: any) => {
      onObjectHoverOut?.(event.object, event.originalEvent);
    };

    const hoverMoveHandler = (event: any) => {
      onObjectHoverMove?.(
        event.object,
        event.point,
        event.distance,
        event.originalEvent
      );
    };

    if (onObjectClick) {
      raycasterManager.addEventListener('objectclick' as never, clickHandler);
    }

    if (onObjectHoverIn) {
      raycasterManager.addEventListener(
        'objecthoverin' as never,
        hoverInHandler
      );
    }

    if (onObjectHoverOut) {
      raycasterManager.addEventListener(
        'objecthoverout' as never,
        hoverOutHandler
      );
    }

    if (onObjectHoverMove) {
      raycasterManager.addEventListener(
        'objecthovermove' as never,
        hoverMoveHandler
      );
    }

    // Activar/desactivar el raycaster
    raycasterManager.setEnabled(enabled);

    return () => {
      // Limpiar event listeners
      if (onObjectClick) {
        raycasterManager.removeEventListener(
          'objectclick' as never,
          clickHandler
        );
      }
      if (onObjectHoverIn) {
        raycasterManager.removeEventListener(
          'objecthoverin' as never,
          hoverInHandler
        );
      }
      if (onObjectHoverOut) {
        raycasterManager.removeEventListener(
          'objecthoverout' as never,
          hoverOutHandler
        );
      }
      if (onObjectHoverMove) {
        raycasterManager.removeEventListener(
          'objecthovermove' as never,
          hoverMoveHandler
        );
      }

      // Desactivar el raycaster al desmontar
      raycasterManager.setEnabled(false);
    };
  }, [
    sceneManager,
    enabled,
    onObjectClick,
    onObjectHoverIn,
    onObjectHoverOut,
    onObjectHoverMove,
  ]);

  return null;
}
