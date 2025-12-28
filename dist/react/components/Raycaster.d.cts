import * as THREE from 'three';

type RaycasterProps = {
    /** Habilitar/deshabilitar el raycasting */
    enabled?: boolean;
    /** Objetos específicos a intersectar (si no se proporciona, usa toda la escena) */
    objects?: THREE.Object3D[];
    /** Callback para click sobre objeto */
    onClick?: (obj: THREE.Object3D) => void;
    /** Callback para hover (enter/move) sobre objeto */
    onHover?: (obj: THREE.Object3D) => void;
};
/**
 * Raycaster
 *
 * Componente declarativo básico para interacción simple (click + hover) con raycasting.
 *
 * Características:
 * - Configuración totalmente reactiva mediante usePlugin inteligente (deep equality + update() automático).
 * - Handler único estabilizado → actualizaciones en caliente sin recrear listeners.
 * - Soporte opcional para lista de objetos específica o fallback a escena completa.
 * - Instancia única del plugin + hot-update eficiente.
 * - Componente headless puro (sin renderizado visual propio).
 *
 * Ideal para selección básica, tooltips simples o feedback hover cuando no se necesita drag ni throttling avanzado
 * (para funcionalidades completas usar <AdvancedRaycaster />).
 *
 * @example
 * <Raycaster
 *   enabled={isInteractive}
 *   onClick={(obj) => console.log('Clicked:', obj.name)}
 *   onHover={(obj) => setHovered(obj)}
 * />
 */
declare const Raycaster: React.FC<RaycasterProps>;

export { Raycaster };
