'use client';
import { useEffect } from 'react';
import { useSceneContext } from '../hooks/SceneContext';
export function Raycaster({ enabled = true, onObjectClick, onObjectHoverIn, onObjectHoverOut, onObjectHoverMove, }) {
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
        // Activar/desactivar el raycaster
        raycasterManager.setEnabled(enabled);
        return () => {
            // Limpiar event listeners
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
//# sourceMappingURL=Raycaster.js.map