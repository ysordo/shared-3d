'use client';
import { useEffect } from 'react';
import type { THREE } from '../..';
import { useSceneContext } from '../hooks/SceneContext';

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
  
  // Nuevos eventos de arrastre genéricos
  onObjectDragStart?: (
    object: THREE.Object3D,
    startPosition: THREE.Vector2,
    originalEvent?: Event
  ) => void;
  onObjectDrag?: (
    object: THREE.Object3D,
    startPosition: THREE.Vector2,
    currentPosition: THREE.Vector2,
    delta: THREE.Vector2,
    normalizedDelta: THREE.Vector2,
    originalEvent?: Event
  ) => void;
  onObjectDragEnd?: (
    object: THREE.Object3D,
    startPosition: THREE.Vector2,
    endPosition: THREE.Vector2,
    totalDelta: THREE.Vector2,
    originalEvent?: Event
  ) => void;
}

export function Raycaster({
  enabled = true,
  onObjectClick,
  onObjectHoverIn,
  onObjectHoverOut,
  onObjectHoverMove,
  onObjectDragStart,
  onObjectDrag,
  onObjectDragEnd,
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

    // Configurar event listeners existentes...
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

    // Nuevos manejadores de arrastre
    const dragStartHandler = (event: any) => {
      onObjectDragStart?.(
        event.object,
        event.startPosition,
        event.originalEvent
      );
    };

    const dragHandler = (event: any) => {
      onObjectDrag?.(
        event.object,
        event.startPosition,
        event.currentPosition,
        event.delta,
        event.normalizedDelta,
        event.originalEvent
      );
    };

    const dragEndHandler = (event: any) => {
      onObjectDragEnd?.(
        event.object,
        event.startPosition,
        event.endPosition,
        event.totalDelta,
        event.originalEvent
      );
    };

    // Registrar todos los event listeners
    if (onObjectClick) {
      raycasterManager.addEventListener('objectclick' as never, clickHandler);
    }
    if (onObjectHoverIn) {
      raycasterManager.addEventListener('objecthoverin' as never, hoverInHandler);
    }
    if (onObjectHoverOut) {
      raycasterManager.addEventListener('objecthoverout' as never, hoverOutHandler);
    }
    if (onObjectHoverMove) {
      raycasterManager.addEventListener('objecthovermove' as never, hoverMoveHandler);
    }
    if (onObjectDragStart) {
      raycasterManager.addEventListener('objectdragstart' as never, dragStartHandler);
    }
    if (onObjectDrag) {
      raycasterManager.addEventListener('objectdrag' as never, dragHandler);
    }
    if (onObjectDragEnd) {
      raycasterManager.addEventListener('objectdragend' as never, dragEndHandler);
    }

    raycasterManager.setEnabled(enabled);

    return () => {
      // Limpiar todos los event listeners
      if (onObjectClick) {
        raycasterManager.removeEventListener('objectclick' as never, clickHandler);
      }
      if (onObjectHoverIn) {
        raycasterManager.removeEventListener('objecthoverin' as never, hoverInHandler);
      }
      if (onObjectHoverOut) {
        raycasterManager.removeEventListener('objecthoverout' as never, hoverOutHandler);
      }
      if (onObjectHoverMove) {
        raycasterManager.removeEventListener('objecthovermove' as never, hoverMoveHandler);
      }
      if (onObjectDragStart) {
        raycasterManager.removeEventListener('objectdragstart' as never, dragStartHandler);
      }
      if (onObjectDrag) {
        raycasterManager.removeEventListener('objectdrag' as never, dragHandler);
      }
      if (onObjectDragEnd) {
        raycasterManager.removeEventListener('objectdragend' as never, dragEndHandler);
      }

      raycasterManager.setEnabled(false);
    };
  }, [
    sceneManager,
    enabled,
    onObjectClick,
    onObjectHoverIn,
    onObjectHoverOut,
    onObjectHoverMove,
    onObjectDragStart,
    onObjectDrag,
    onObjectDragEnd,
  ]);

  return null;
}