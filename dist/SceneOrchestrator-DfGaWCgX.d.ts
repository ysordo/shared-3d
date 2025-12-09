import * as THREE from 'three';
import { ManifestEntry } from './core/cache/types.js';

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
declare class SceneOrchestrator {
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
    private constructor();
    static getInstance(canvas?: HTMLCanvasElement, config?: SceneConfig): SceneOrchestrator;
    use(plugin: Plugin): this;
    plugin(name: string): Plugin;
    setModel(entry: ManifestEntry, options?: {
        draco?: boolean;
    }): Promise<THREE.Group>;
    removeModel(): void;
    setHDRI(entry: ManifestEntry): Promise<THREE.Texture>;
    clearHDRI(): void;
    dispose(): void;
    getActiveModel(): THREE.Group | null;
    getActiveHDRI(): THREE.Texture | null;
}

export { type PluginContext as P, type SceneConfig as S, SceneOrchestrator as a, type Plugin as b };
