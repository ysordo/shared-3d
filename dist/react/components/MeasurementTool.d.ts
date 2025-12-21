import * as THREE from 'three';

type MeasurementToolProps = {
    /** Habilitar/deshabilitar la herramienta de medición */
    enabled?: boolean;
    /** Radio de las esferas que marcan los puntos seleccionados */
    pointRadius?: number;
    /** Color de puntos y línea (formato hexadecimal Three.js) */
    color?: number;
    /** Callback invocado al completar una medición (2 puntos) */
    onMeasure?: (distance: number, points: [THREE.Vector3, THREE.Vector3]) => void;
};
/**
 * MeasurementTool
 *
 * Componente declarativo para herramienta de medición interactiva punto a punto.
 *
 * Características:
 * - Selección de 2 puntos sobre el modelo activo con feedback visual inmediato.
 * - Callback onMeasure con distancia y puntos finales (solo al completar).
 * - Configuración totalmente reactiva mediante usePlugin inteligente (deep equality + update() automático).
 * - Integración óptima: instancia única + hot-update de color, radius y enabled.
 * - Componente headless puro (sin renderizado visual propio).
 *
 * Ideal para visualizadores técnicos donde el usuario necesite medir dimensiones reales.
 *
 * @example
 * <MeasurementTool
 *   enabled={isMeasuring}
 *   color={0xff0000}
 *   pointRadius={0.08}
 *   onMeasure={(distance, points) => {
 *     console.log(`Distancia: ${distance.toFixed(2)} unidades`);
 *   }}
 * />
 */
declare const MeasurementTool: React.FC<MeasurementToolProps>;

export { MeasurementTool };
