import * as THREE from 'three';

type AdvancedRaycasterProps = {
    /** Modelo específico para raycasting (si no se proporciona, usa el modelo activo global) */
    model?: THREE.Object3D | null;
    /** Callback para click sobre objeto */
    onClick?: (event: {
        object: THREE.Object3D;
        point: THREE.Vector3;
        distance: number;
    }) => void;
    /** Callback para hover enter */
    onHoverIn?: (event: {
        object: THREE.Object3D;
        point: THREE.Vector3;
        distance: number;
    }) => void;
    /** Callback para hover leave */
    onHoverOut?: (event: {
        object: THREE.Object3D;
    }) => void;
    /** Callback para hover move */
    onHoverMove?: (event: {
        object: THREE.Object3D;
        point: THREE.Vector3;
        distance: number;
    }) => void;
    /** Callback para inicio de drag */
    onDragStart?: (event: {
        object: THREE.Object3D;
    }) => void;
    /** Callback durante drag */
    onDrag?: (event: {
        object: THREE.Object3D;
        delta: THREE.Vector2;
        normalizedDelta: THREE.Vector2;
    }) => void;
    /** Callback para fin de drag */
    onDragEnd?: (event: {
        object: THREE.Object3D;
    }) => void;
};
/**
 * AdvancedRaycaster
 *
 * Componente declarativo para interacción avanzada con raycasting (click, hover, drag).
 *
 * Características:
 * - Soporte completo para todos los eventos del AdvancedRaycasterPlugin.
 * - Modelo objetivo flexible: custom o fallback al modelo activo global.
 * - Configuración totalmente reactiva mediante usePlugin inteligente (deep equality + hot-update).
 * - Handler único estabilizado → actualizaciones en caliente sin recrear plugin innecesariamente.
 * - Instancia dummy segura cuando no hay modelo → evita errores y mantiene ciclo de vida.
 * - Componente headless puro (sin renderizado visual).
 *
 * Ideal para selección avanzada, tooltips dinámicos, drag de partes o feedback visual rico.
 *
 * @example
 * <AdvancedRaycaster
 *   onClick={(e) => console.log('Clicked:', e.object.name)}
 *   onHoverIn={(e) => setHovered(e.object)}
 *   onHoverOut={() => setHovered(null)}
 * />
 */
declare const AdvancedRaycaster: React.FC<AdvancedRaycasterProps>;

export { AdvancedRaycaster };
