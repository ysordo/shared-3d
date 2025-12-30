import { b as Plugin, P as PluginContext } from '../../index-DE4jh8VF.cjs';
import * as THREE from 'three';
import '../loaders/loaders.d.cjs';
import '../cache/types.cjs';

type MeasurementEvent = {
    /** Punto seleccionado en este click */
    point: THREE.Vector3;
    /** Distancia calculada (solo cuando se completa la medición de 2 puntos) */
    distance?: number;
    /** Array acumulativo de puntos seleccionados */
    points: THREE.Vector3[];
};
type MeasurementConfig = {
    /** Habilitar/deshabilitar la herramienta */
    enabled?: boolean;
    /** Radio de las esferas que marcan los puntos */
    pointRadius?: number;
    /** Color de puntos y línea (formato hexadecimal Three.js) */
    color?: number;
    /** Callback invocado en cada punto y al completar la medición */
    onMeasure?: (event: MeasurementEvent) => void;
};
/**
 * MeasurementToolPlugin
 *
 * Plugin de herramienta de medición interactiva punto a punto sobre el modelo activo.
 *
 * Características principales:
 * - Selección de hasta 2 puntos mediante click izquierdo sobre el modelo.
 * - Visualización inmediata con esferas en los puntos y línea al completar.
 * - Callback reactivo onMeasure con información progresiva y final (distancia).
 * - Configuración en caliente (enabled, color, radius) sin recrear la instancia.
 * - Limpieza automática de geometrías/materiales tras 3 segundos o al deshabilitar.
 * - Integración limpia con eventos DOM (pointerdown en capture) y dispose completo.
 * - Sin requestAnimationFrame propio → compatible con loop centralizado.
 *
 * Ideal para visualizadores técnicos, CAD-like, arquitectura o e-commerce de productos
 * donde el usuario necesite medir dimensiones reales.
 *
 * @example
 * new MeasurementToolPlugin({
 *   color: 0xff0000,
 *   pointRadius: 0.08,
 *   onMeasure: (event) => {
 *     if (event.distance !== undefined) {
 *       console.log(`Distancia: ${event.distance.toFixed(2)} unidades`);
 *     }
 *   }
 * })
 */
declare class MeasurementToolPlugin implements Plugin {
    readonly name = "MeasurementTool";
    private camera;
    private scene;
    private renderer;
    private orchestrator;
    private enabled;
    private points;
    private spheres;
    private line?;
    private config;
    private pointerHandler;
    private readonly raycaster;
    private readonly pointer;
    constructor(config?: MeasurementConfig);
    enable(): void;
    disable(): void;
    update(newConfig: Partial<MeasurementConfig>): void;
    install({ scene, camera, renderer, orchestrator }: PluginContext): void;
    private handlePointerDown;
    private spawnPoint;
    private finishMeasurement;
    private reset;
    dispose(): void;
}

export { type MeasurementConfig, type MeasurementEvent, MeasurementToolPlugin };
