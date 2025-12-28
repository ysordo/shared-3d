import { HDRILoaderOptions } from './core/loaders/HDRILoader.cjs';
import { ManifestEntry } from './core/cache/types.cjs';
import * as THREE from 'three';

type PluginContext = {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    orchestrator: SceneOrchestrator;
};
interface Plugin {
    name: string;
    /** Called once when plugin is registered */
    install(context: PluginContext): void;
    /** Optional: called every frame BEFORE main render */
    preRender?(deltaTime?: number, elapsedTime?: number): void;
    /** Optional: called every frame AFTER main render (ideal for post-processing) */
    postRender?(deltaTime?: number, elapsedTime?: number): void;
    /** Optional: hot update of configuration */
    update?(config: unknown): void;
    /** Optional: resize handler */
    resize?(width: number, height: number): void;
    /** Cleanup resources */
    dispose?(): void;
}
type ConfigToTuple<T extends object, OrderedKeys extends readonly (keyof T)[]> = OrderedKeys extends readonly [infer First, ...infer Rest] ? First extends keyof T ? Rest extends readonly (keyof T)[] ? [T[First], ...ConfigToTuple<T, Rest>] : [T[First]] : never : [];

type SceneConfig = {
    antialias?: boolean;
    shadows?: boolean;
    toneMapping?: THREE.ToneMapping;
    toneMappingExposure?: number;
    background?: THREE.Color | string | THREE.Texture;
    clearColor?: THREE.ColorRepresentation;
};
/**
 * SceneOrchestrator
 *
 * Núcleo central y singleton de la librería Three.js para React.
 *
 * Responsabilidades:
 * - Gestión única de renderer, scene, camera y ciclo de vida global.
 * - Sistema de plugins moderno con loop de animación centralizado (preRender / postRender).
 * - Render delegable a PostProcessingPlugin cuando está activo.
 * - Resize global que notifica a todos los plugins.
 * - Intercepción segura de setModel para integración con controles orbitales.
 * - API pública estable y mínima exposición de internals.
 *
 * Arquitectura alineada con principios de librería escalable:
 * - Core puro Three.js desacoplado de React.
 * - Ciclo de vida explícito y determinista.
 * - Optimización de rendimiento (un único requestAnimationFrame).
 * - Limpieza exhaustiva de recursos.
 */
declare class SceneOrchestrator extends THREE.EventDispatcher {
    private static instance;
    readonly scene: THREE.Scene;
    readonly camera: THREE.PerspectiveCamera;
    readonly renderer: THREE.WebGLRenderer;
    private activeModel;
    private activeHDRI;
    private canvas;
    private animationId;
    private plugins;
    private resizeObserver;
    private constructor();
    /** Singleton access */
    static getInstance(canvas?: HTMLCanvasElement, config?: SceneConfig): SceneOrchestrator;
    private startAnimationLoop;
    use<T extends Plugin>(plugin: T): T;
    plugin<T extends Plugin = Plugin>(name: string): T | undefined;
    has(name: string): boolean;
    remove(name: string): void;
    setModel(model: THREE.Group): Promise<void>;
    removeModel(): void;
    setHDRI(entry: ManifestEntry, config?: Partial<Omit<HDRILoaderOptions, 'dataType' | 'preserveHDR' | 'rgbeLoaderOptions'>>): Promise<THREE.Texture>;
    clearHDRI(): void;
    dispose(): void;
    getActiveModel(): THREE.Group | null;
    getActiveHDRI(): THREE.Texture | null;
}

export { type ConfigToTuple as C, type PluginContext as P, type SceneConfig as S, SceneOrchestrator as a, type Plugin as b };
