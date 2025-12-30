import { HDRILoaderOptions } from './core/loaders/loaders.d.js';
import { ManifestEntry } from './core/cache/types.js';
import * as THREE from 'three';

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
    private _activeModel;
    private _activeHDRI;
    private canvas;
    private animationId;
    private plugins;
    private resizeObserver;
    private constructor();
    static getInstance(canvas?: HTMLCanvasElement, config?: SceneConfig): SceneOrchestrator;
    private startAnimationLoop;
    plugin: {
        use: <T extends Plugin>(plugin: T) => T;
        get: <T extends Plugin = Plugin>(name: string) => T | undefined;
        has: (name: string) => boolean;
        remove: (name: string) => void;
    };
    private usePlugin;
    private getPlugin;
    private hasPlugin;
    private removePlugin;
    activeModel: {
        set: (model: THREE.Group) => Promise<void>;
        get: THREE.Group<THREE.Object3DEventMap> | null;
        remove: () => void;
    };
    private setModel;
    private removeModel;
    activeHDRI: {
        set: (entry: ManifestEntry, config?: Partial<Omit<HDRILoaderOptions, "dataType" | "preserveHDR" | "rgbeLoaderOptions">>) => Promise<THREE.Texture>;
        get: THREE.Texture | null;
        clear: () => void;
    };
    private setHDRI;
    private clearHDRI;
    dispose(): void;
}

type PluginContext = {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    orchestrator: SceneOrchestrator;
};
interface Plugin {
    name: string;
    install(context: PluginContext): void;
    preRender?(deltaTime?: number, elapsedTime?: number): void;
    postRender?(deltaTime?: number, elapsedTime?: number): void;
    update?(config: unknown): void;
    resize?(width: number, height: number): void;
    dispose?(): void;
}
type ConfigToTuple<T extends object, OrderedKeys extends readonly (keyof T)[]> = OrderedKeys extends readonly [infer First, ...infer Rest] ? First extends keyof T ? Rest extends readonly (keyof T)[] ? [T[First], ...ConfigToTuple<T, Rest>] : [T[First]] : never : [];

export { type ConfigToTuple as C, type PluginContext as P, type SceneConfig as S, SceneOrchestrator as a, type Plugin as b };
