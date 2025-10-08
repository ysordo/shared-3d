'use client';
import { useEffect } from 'react';
import { useSceneContext } from '../hooks/SceneContext';
export function Raycaster({ enabled = true, onObjectClick, onObjectHoverIn, onObjectHoverOut, onObjectHoverMove, onObjectDragStart, onObjectDrag, onObjectDragEnd, }) {
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
        const clickHandler = (event) => {
            onObjectClick?.(event.object, event.point, event.distance, event.originalEvent);
        };
        const hoverInHandler = (event) => {
            onObjectHoverIn?.(event.object, event.point, event.distance, event.originalEvent);
        };
        const hoverOutHandler = (event) => {
            onObjectHoverOut?.(event.object, event.originalEvent);
        };
        const hoverMoveHandler = (event) => {
            onObjectHoverMove?.(event.object, event.point, event.distance, event.originalEvent);
        };
        // Nuevos manejadores de arrastre
        const dragStartHandler = (event) => {
            onObjectDragStart?.(event.object, event.startPosition, event.originalEvent);
        };
        const dragHandler = (event) => {
            onObjectDrag?.(event.object, event.startPosition, event.currentPosition, event.delta, event.normalizedDelta, event.originalEvent);
        };
        const dragEndHandler = (event) => {
            onObjectDragEnd?.(event.object, event.startPosition, event.endPosition, event.totalDelta, event.originalEvent);
        };
        // Registrar todos los event listeners
        if (onObjectClick) {
            raycasterManager.addEventListener('objectclick', clickHandler);
        }
        if (onObjectHoverIn) {
            raycasterManager.addEventListener('objecthoverin', hoverInHandler);
        }
        if (onObjectHoverOut) {
            raycasterManager.addEventListener('objecthoverout', hoverOutHandler);
        }
        if (onObjectHoverMove) {
            raycasterManager.addEventListener('objecthovermove', hoverMoveHandler);
        }
        if (onObjectDragStart) {
            raycasterManager.addEventListener('objectdragstart', dragStartHandler);
        }
        if (onObjectDrag) {
            raycasterManager.addEventListener('objectdrag', dragHandler);
        }
        if (onObjectDragEnd) {
            raycasterManager.addEventListener('objectdragend', dragEndHandler);
        }
        raycasterManager.setEnabled(enabled);
        return () => {
            // Limpiar todos los event listeners
            if (onObjectClick) {
                raycasterManager.removeEventListener('objectclick', clickHandler);
            }
            if (onObjectHoverIn) {
                raycasterManager.removeEventListener('objecthoverin', hoverInHandler);
            }
            if (onObjectHoverOut) {
                raycasterManager.removeEventListener('objecthoverout', hoverOutHandler);
            }
            if (onObjectHoverMove) {
                raycasterManager.removeEventListener('objecthovermove', hoverMoveHandler);
            }
            if (onObjectDragStart) {
                raycasterManager.removeEventListener('objectdragstart', dragStartHandler);
            }
            if (onObjectDrag) {
                raycasterManager.removeEventListener('objectdrag', dragHandler);
            }
            if (onObjectDragEnd) {
                raycasterManager.removeEventListener('objectdragend', dragEndHandler);
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
//# sourceMappingURL=Raycaster.js.map