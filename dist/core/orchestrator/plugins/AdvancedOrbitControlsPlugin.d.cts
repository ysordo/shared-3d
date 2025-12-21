import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-DPFoyHCW.cjs';
import '../../loaders/HDRILoader.cjs';
import '../../cache/types.cjs';
import 'three';

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
    constructor(partialOptions?: Partial<{
        enablePan?: boolean;
        enableRotate?: boolean;
        enableZoom?: boolean;
        dampingFactor?: number;
        panSpeed?: number;
        rotateSpeed?: number;
        zoomSpeed?: number;
        minDistance?: number;
        maxDistance?: number;
        minPolarAngle?: number;
        maxPolarAngle?: number;
    }>);
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
    update(newOptions: Partial<{
        enablePan?: boolean;
        enableRotate?: boolean;
        enableZoom?: boolean;
        dampingFactor?: number;
        panSpeed?: number;
        rotateSpeed?: number;
        zoomSpeed?: number;
        minDistance?: number;
        maxDistance?: number;
        minPolarAngle?: number;
        maxPolarAngle?: number;
    }>): void;
    dispose(): void;
}

export { AdvancedOrbitControlsPlugin };
