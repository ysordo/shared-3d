import * as THREE from 'three';

type HotspotProps = {
    /** ID único del hotspot (requerido para diff eficiente) */
    id: string;
    /** Posición fija en espacio mundo */
    position: [number, number, number];
    /** Target opcional para seguimiento automático (si no se proporciona, usa posición fija) */
    target?: THREE.Object3D;
    /** Callback ejecutado al hacer click sobre el hotspot */
    onClick: () => void;
    /** Visibilidad del hotspot (opcional, default true) */
    visible?: boolean;
};
/**
 * Hotspot
 *
 * Componente declarativo para un único hotspot interactivo 3D.
 *
 * Características:
 * - Posición fija o seguimiento automático de un target (Object3D).
 * - Click callback configurable.
 * - Configuración totalmente reactiva mediante usePlugin inteligente (deep equality + update() automático).
 * - Instancia dummy segura cuando no hay target → evita errores y mantiene ciclo de vida.
 * - Soporte opcional para visible (extensible sin breaking change).
 * - Componente headless puro (sin renderizado visual propio).
 *
 * Ideal para puntos de interés individuales, botones 3D o triggers interactivos.
 *
 * @example
 * <Hotspot
 *   id="info-btn"
 *   position={[0, 2, 0]}
 *   onClick={() => setPanelOpen(true)}
 * />
 *
 * // Con seguimiento
 * <Hotspot
 *   id="wheel-info"
 *   target={wheelObject}
 *   onClick={() => showWheelDetails()}
 * />
 */
declare const Hotspot: React.FC<HotspotProps>;

export { Hotspot };
