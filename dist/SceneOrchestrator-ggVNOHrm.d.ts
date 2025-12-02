import * as THREE from 'three';
import 'three/examples/jsm/controls/OrbitControls.js';
import 'three/examples/jsm/loaders/GLTFLoader.js';
import 'three/examples/jsm/loaders/DRACOLoader.js';
import 'three/examples/jsm/loaders/RGBELoader.js';
import 'three/examples/jsm/loaders/EXRLoader.js';
import 'three/examples/jsm/postprocessing/EffectComposer.js';
import 'three/examples/jsm/postprocessing/RenderPass.js';
import 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import React, { ReactNode } from 'react';

type ManifestEntry = {
    id: string;
    url: string;
    hash: string;
    size: number;
    updatedAt: number;
};
type CacheEntry<T = any> = {
    data: T;
    hash: string;
    timestamp: number;
    size: number;
    updatedAt: number;
};
type CacheReport = {
    validated: boolean;
    updated: string[];
    removed: string[];
    added: string[];
    errors: string[];
    durationMs: number;
};
type ModelManifest = ManifestEntry[];

declare const THREE_VERSION: string;

type CustomMaterialFactory = (originalMaterial: THREE.Material) => THREE.Material;
type MaterialConfig = {
    name: string;
    type: 'textured';
} | {
    name: string;
    type: 'solid';
    color?: THREE.ColorRepresentation;
    metalness?: number;
    roughness?: number;
} | {
    name: string;
    type: 'wireframe';
    color?: THREE.ColorRepresentation;
    lineColor?: THREE.ColorRepresentation;
    [key: string]: any;
} | {
    name: string;
    type: 'custom';
    factory: CustomMaterialFactory;
};
type MaterialItem = {
    name: string;
    apply: () => void;
    isActive: boolean;
};
type MaterialControllerProps = {
    materials: MaterialConfig[];
    transitionDuration?: number;
    children: (items: MaterialItem[]) => ReactNode;
    className?: string;
};
declare const MaterialController: React.FC<MaterialControllerProps>;

type Vector3Tuple = [number, number, number];
type ColorRepresentation = THREE.ColorRepresentation;

type LightConfig = {
    intensity?: number;
    color?: ColorRepresentation;
    position?: Vector3Tuple;
    castShadow?: boolean;
};
type ClickEvent = {
    object: THREE.Object3D;
    point: THREE.Vector3;
    distance: number;
};
type HoverEvent = {
    object: THREE.Object3D;
    point: THREE.Vector3;
};

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

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

export { type CacheReport as C, type DeepPartial as D, type HoverEvent as H, type LightConfig as L, type ManifestEntry as M, type Plugin as P, type SceneConfig as S, THREE_VERSION as T, type Vector3Tuple as V, type CacheEntry as a, type ModelManifest as b, type PluginContext as c, SceneOrchestrator as d, type ColorRepresentation as e, type ClickEvent as f, type CustomMaterialFactory as g, type MaterialConfig as h, MaterialController as i };
