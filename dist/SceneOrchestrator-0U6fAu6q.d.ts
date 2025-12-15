import { HDRILoaderOptions } from './core/loaders/HDRILoader.js';
import { ManifestEntry } from './core/cache/types.js';
import * as THREE from 'three';

type PluginContext = {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    orchestrator: SceneOrchestrator;
};
interface Plugin {
    name: string;
    install(context: PluginContext): void;
    dispose?(): void;
}

type SceneConfig = {
    antialias?: boolean;
    shadows?: boolean;
    toneMapping?: THREE.ToneMapping;
    toneMappingExposure?: number;
    background?: THREE.Color | string | THREE.Texture;
    clearColor?: THREE.ColorRepresentation;
};
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
    private resizeHandler;
    private resizeObserver;
    private constructor();
    static getInstance(canvas?: HTMLCanvasElement, config?: SceneConfig): SceneOrchestrator;
    use(plugin: Plugin): this;
    plugin(name: string): Plugin;
    has(name: string): boolean;
    remove(name: string): void;
    setModel(entry: ManifestEntry, options?: {
        draco?: boolean;
    }): Promise<THREE.Group>;
    removeModel(): void;
    setHDRI(entry: ManifestEntry, config?: Partial<Omit<HDRILoaderOptions, 'dataType' | 'preserveHDR' | 'rgbeLoaderOptions'>>): Promise<THREE.Texture>;
    clearHDRI(): void;
    dispose(): void;
    getActiveModel(): THREE.Group | null;
    getActiveHDRI(): THREE.Texture | null;
}

export { type PluginContext as P, type SceneConfig as S, SceneOrchestrator as a, type Plugin as b };
