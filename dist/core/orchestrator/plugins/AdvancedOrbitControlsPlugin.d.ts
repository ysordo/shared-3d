import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-DxWUNuG8.js';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';
import 'three';

interface AOCPluginConfig {
    enablePan: boolean;
    enableRotate: boolean;
    enableZoom: boolean;
    dampingFactor: number;
    panSpeed: number;
    rotateSpeed: number;
    zoomSpeed: number;
    minDistance: number;
    maxDistance: number;
    minPolarAngle: number;
    maxPolarAngle: number;
}
/**
 * AdvancedOrbitControlsPlugin
 *
 * Plugin avanzado de controles de órbita para navegación intuitiva en escenas 3D.
 *
 * Características principales:
 * - Wrapper configurable y reactivo sobre Three.js OrbitControls.
 * - Soporte completo para damping, límites de distancia/ángulo, velocidades y habilitación individual de pan/rotate/zoom.
 * - Integración con el loop centralizado del SceneOrchestrator mediante preRender() (un único update() por frame).
 * - API de actualización en caliente vía update() y setters/getters públicos para control imperativo desde React.
 * - Configuración inicial flexible mediante opciones parciales (valores por defecto sensatos).
 * - Limpieza completa de eventos y recursos en dispose().
 *
 * Perfecto para viewers de productos, visualizadores arquitectónicos o cualquier experiencia donde se requiera
 * navegación orbital fluida y altamente configurable sin exponer directamente OrbitControls al consumidor.
 *
 * @example
 * new AdvancedOrbitControlsPlugin({
 *   enablePan: false,
 *   minDistance: 2,
 *   maxDistance: 10,
 *   dampingFactor: 0.08
 * })
 */
declare class AdvancedOrbitControlsPlugin implements Plugin {
    readonly name = "AdvancedOrbitControls";
    private controls;
    private options;
    constructor(partialOptions?: Partial<AOCPluginConfig>);
    install({ camera, renderer }: PluginContext): void;
    preRender(): void;
    private applyOptionsToControls;
    set enablePan(enabled: boolean);
    get enablePan(): boolean;
    set enableRotate(enabled: boolean);
    get enableRotate(): boolean;
    set enableZoom(enabled: boolean);
    get enableZoom(): boolean;
    set minDistance(distance: number);
    get minDistance(): number;
    set maxDistance(distance: number);
    get maxDistance(): number;
    update(newOptions: Partial<AOCPluginConfig>): void;
    dispose(): void;
}

export { type AOCPluginConfig, AdvancedOrbitControlsPlugin };
