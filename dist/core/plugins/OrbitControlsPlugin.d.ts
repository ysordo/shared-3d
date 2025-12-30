import { b as Plugin, P as PluginContext } from '../../index-oH7U2rpR.js';
import '../loaders/loaders.d.js';
import 'three';
import '../cache/types.js';

/**
 * OrbitControlsPlugin
 *
 * Plugin básico de controles orbitales estándar para navegación fluida en escenas 3D.
 *
 * Características principales:
 * - Wrapper mínimo y estable sobre Three.js OrbitControls con configuración sensible por defecto.
 * - Damping activado para movimiento natural e inercia.
 * - Límites razonables (distancia, ángulo polar) para evitar comportamientos extremos.
 * - Integración completa con el loop centralizado del SceneOrchestrator mediante preRender()
 *   (elimina RAF propio → un único update por frame global).
 * - Getters públicos para inspección de estado (útil en combinaciones con otros plugins).
 * - Limpieza segura en dispose().
 *
 * Recomendado como base simple cuando no se necesita configuración avanzada o reactiva.
 * Para mayor control (hot-updates, setters, opciones dinámicas) usar AdvancedOrbitControlsPlugin.
 *
 * @example
 * new OrbitControlsPlugin() // configuración por defecto lista para producción
 */
declare class OrbitControlsPlugin implements Plugin {
    readonly name = "OrbitControls";
    private controls;
    install({ camera, renderer }: PluginContext): void;
    preRender(): void;
    get maxDistance(): number;
    get minDistance(): number;
    get enableRotate(): boolean;
    get enableZoom(): boolean;
    get enablePan(): boolean;
    dispose(): void;
}

export { OrbitControlsPlugin };
