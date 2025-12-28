import React from 'react';
import * as THREE from 'three';

type AdvancedDragRaycasterProps = {
    /** Render prop para exponer estado y controles al consumidor */
    children?: (state: {
        isEnabled: boolean;
        toggleEnabled: () => void;
        setEnabled: (value: boolean) => void;
        resetAll: () => void;
        isResetting: boolean;
    }) => React.ReactNode;
    /** Estado inicial de habilitación */
    defaultEnabled?: boolean;
    /** Compensar rotación del modelo raíz durante drag (recomendado = true) */
    enableRotationCompensation?: boolean;
    /** Duración en ms de la animación de reset */
    transitionDuration?: number;
    /** Callbacks opcionales de ciclo de drag */
    onDragStart?: (object: THREE.Object3D) => void;
    onDrag?: (object: THREE.Object3D, worldDelta: THREE.Vector3) => void;
    onDragEnd?: (object: THREE.Object3D) => void;
};
/**
 * AdvancedDragRaycaster
 *
 * Componente declarativo avanzado para arrastrar objetos 3D individuales con raycasting.
 *
 * Características:
 * - Drag preciso en espacio mundo con compensación opcional de rotación del modelo raíz.
 * - Estado exponible vía render prop (enabled, toggle, reset animado).
 * - Integración óptima con usePlugin inteligente: instancia única + hot-update de modelo/handler.
 * - Reset suave animado de objetos arrastrados a su posición/quaternion original.
 * - Sin RAF propio para drag (event-driven) + cleanup seguro del reset.
 * - Totalmente reactivo y headless.
 *
 * Ideal para editores 3D, configuradores de productos o experiencias interactivas donde
 * el usuario pueda reposicionar partes individuales.
 *
 * @example
 * <AdvancedDragRaycaster defaultEnabled={true}>
 *   {({ isEnabled, toggleEnabled, resetAll }) => (
 *     <button onClick={toggleEnabled}>
 *       Drag {isEnabled ? 'ON' : 'OFF'}
 *     </button>
 *   )}
 * </AdvancedDragRaycaster>
 */
declare const AdvancedDragRaycaster: React.FC<AdvancedDragRaycasterProps>;

export { AdvancedDragRaycaster };
