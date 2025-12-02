import * as THREE from 'three';
import type { ManifestEntry } from '../cache/types';
import type { Plugin } from './types';
export type SceneConfig = {
    antialias?: boolean;
    shadows?: boolean;
    toneMapping?: THREE.ToneMapping;
    toneMappingExposure?: number;
    background?: THREE.Color | string | THREE.Texture;
    clearColor?: THREE.ColorRepresentation;
};
export declare class SceneOrchestrator {
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
//# sourceMappingURL=SceneOrchestrator.d.ts.map