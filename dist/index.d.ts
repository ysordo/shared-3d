import React, { ReactNode, Component } from 'react';
import * as THREE from 'three';
export { THREE };
import * as react_jsx_runtime from 'react/jsx-runtime';
export { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export { GLTFLoader as ThreeGLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export { DRACOLoader as ThreeDRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
export { RGBELoader as ThreeRGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
export { EXRLoader as ThreeEXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
export { EffectComposer as ThreeEffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
export { RenderPass as ThreeRenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
export { UnrealBloomPass as ThreeUnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

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

type SceneProviderProps = {
    children: ReactNode;
    config?: SceneConfig | undefined;
};
declare const SceneProvider: React.ForwardRefExoticComponent<SceneProviderProps & React.RefAttributes<HTMLCanvasElement>>;

declare const CacheProvider: ({ children }: {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;

type ValidationOptions = {
    manifest: ManifestEntry[];
    onProgress?: (progress: number, status: string) => void;
    onComplete?: (report: CacheReport) => void;
    forceUpdate?: boolean;
};
declare class CacheValidator {
    private static isFirstLoad;
    static validate(options: ValidationOptions): Promise<CacheReport>;
    static reset(): void;
}

declare class FileWatcher {
    private static instance;
    private watchers;
    private manifest;
    private onChange?;
    private constructor();
    static getInstance(): FileWatcher;
    watch(manifest: ManifestEntry[], onChange: (ids: string[]) => void): void;
    private checkForChanges;
    private startPolling;
    dispose(): void;
}

declare function generateManifest(modelsDir?: string, outputPath?: string): Promise<ManifestEntry[]>;

declare class ObjectCache {
    private static getKey;
    static set<T>(id: string, data: T, hash: string, updatedAt?: number): Promise<void>;
    static get<T>(id: string): Promise<CacheEntry<T> | null>;
    static has(id: string): Promise<boolean>;
    static delete(id: string): Promise<void>;
    static clearAll(): Promise<void>;
    private static dispose;
    private static estimateSize;
}

type GLTFLoaderOptions = {
    draco?: boolean | undefined;
    decoderPath?: string | undefined;
};
type GLTFLoaderEvents = {
    onProgress?: (p: {
        loaded: number;
        total: number;
        percent: number;
        url: string;
    }) => void | undefined;
    onLoaded?: (obj: THREE.Group, entry: ManifestEntry) => void | undefined;
    onError?: (err: Error, url: string) => void | undefined;
};
declare class GLTFLoader {
    private static plainLoader;
    private static dracoLoaderInstance;
    private static dracoDecoder;
    private static isDracoInitialized;
    private static getLoader;
    static load(entry: ManifestEntry, options?: GLTFLoaderOptions & GLTFLoaderEvents): Promise<THREE.Group>;
    static preload(entries: ModelManifest, options?: GLTFLoaderOptions, onProgress?: (completed: number, total: number) => void): Promise<void>;
    static invalidate(id: string): Promise<void>;
    static clearCache(): Promise<void>;
}

type HDRIProgress = {
    loaded: number;
    total: number;
    percent: number;
    url: string;
};
type HDRIEvents = {
    onProgress?: (progress: HDRIProgress) => void;
    onLoaded?: (texture: THREE.Texture, entry: ManifestEntry) => void;
    onError?: (error: Error, url: string) => void;
};
declare class HDRILoader {
    private static rgbeLoader;
    private static webpLoader;
    /**
     * Carga un HDRI de forma inteligente (con caché + hash)
     */
    static load(entry: ManifestEntry, events?: HDRIEvents): Promise<THREE.Texture>;
    /**
     * Precarga múltiples HDRIs
     */
    static preload(entries: ModelManifest, onProgress?: (completed: number, total: number) => void): Promise<void>;
    /**
     * Invalida caché de un HDRI específico
     */
    static invalidate(id: string): Promise<void>;
}

interface WebPHDRData {
    width: number;
    height: number;
    data: Float32Array | Uint16Array;
    type: typeof THREE.FloatType | typeof THREE.HalfFloatType;
    exposure: number;
    maxLuminance: number;
}
/**
 * Loader para WebP HDR (RGBM encoding)
 * Soporta .webp con metadatos HDR preservados
 * Ideal para environment maps ligeros y rápidos
 */
declare class WebPHDRLoader {
    manager: THREE.LoadingManager;
    private type;
    private exposure;
    private preserveHDR;
    constructor(manager?: THREE.LoadingManager);
    setDataType(type: typeof THREE.FloatType | typeof THREE.HalfFloatType): this;
    setExposure(exposure: number): this;
    setPreserveHDR(preserve: boolean): this;
    load(url: string, onLoad?: (texture: THREE.DataTexture, data: WebPHDRData) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: Event) => void): THREE.DataTexture;
    parse(buffer: ArrayBuffer): WebPHDRData;
}

declare class AdvancedCameraCollisionPlugin implements Plugin {
    readonly distanceThreshold: number;
    readonly pushBackOffset: number;
    name: string;
    private handle;
    constructor(distanceThreshold?: number, pushBackOffset?: number);
    install({ camera, orchestrator }: PluginContext): void;
    dispose(): void;
}

declare class AdvancedOrbitControlsPlugin implements Plugin {
    private options;
    name: string;
    private controls;
    private config;
    constructor(options?: Partial<typeof this.config>);
    install({ camera, renderer }: PluginContext): void;
    setPanEnabled(enabled: boolean): void;
    setRotateEnabled(enabled: boolean): void;
    setZoomEnabled(enabled: boolean): void;
    setAllEnabled(enabled: boolean): void;
    dispose(): void;
}

declare class RaycasterManager extends THREE.EventDispatcher {
    private raycaster;
    private pointer;
    private scene?;
    private camera?;
    private domElement;
    private interactableObjects;
    private lastHoverObject;
    private isEnabled;
    private isDragging;
    private currentDragObject;
    private dragStartPosition;
    private lastRaycastTime;
    private raycastThrottleMs;
    constructor(domElement: HTMLElement);
    setModel(model: THREE.Object3D): void;
    private isInteractable;
    initialize(scene: THREE.Scene, camera: THREE.Camera): void;
    setEnabled(enabled: boolean): void;
    private attachEvents;
    private detachEvents;
    private onPointerMove;
    private onPointerDown;
    private onPointerUp;
    private onClick;
    private handleDrag;
    private throttledRaycast;
    private raycast;
    private performRaycast;
    private updatePointer;
    private clearHoverState;
    private onContextMenu;
    private onTouchStart;
    private onTouchMove;
    private onTouchEnd;
}
declare class AdvancedRaycasterPlugin implements Plugin {
    private model?;
    private onEvent?;
    name: string;
    private _manager;
    constructor(model?: THREE.Object3D | undefined, onEvent?: ((event: any) => void) | undefined);
    install({ scene, camera, renderer, orchestrator }: PluginContext): void;
    dispose(): void;
    get manager(): RaycasterManager;
}

type AnnotationData = {
    id: string;
    position: THREE.Vector3;
    target?: THREE.Object3D | undefined;
    content: string | HTMLElement;
    offset?: THREE.Vector3 | undefined;
    visible?: boolean | undefined;
};
declare class AnnotationsPlugin implements Plugin {
    private data;
    name: string;
    private annotations;
    private camera;
    private scene;
    constructor(data: AnnotationData[]);
    install({ camera, scene }: PluginContext): void;
    private createLabel;
    dispose(): void;
}

type AutoLODConfig = {
    distances: [number, number, number];
    reductionPercentages?: [number, number];
};
declare class AutoLODSystemPlugin implements Plugin {
    private config;
    name: string;
    private lods;
    private camera;
    constructor(config: AutoLODConfig);
    private simplifyGeometry;
    private createLODLevels;
    install({ camera, orchestrator }: PluginContext): void;
    dispose(): void;
}

type HotspotData$1 = {
    id: string;
    position: THREE.Vector3;
    target?: THREE.Object3D | undefined;
    onClick: () => void;
};
declare class HotspotPlugin implements Plugin {
    private data;
    name: string;
    private hotspots;
    constructor(data: HotspotData$1[]);
    install({ scene }: PluginContext): void;
    dispose(): void;
}

type LODLevel$1 = {
    distance: number;
    model: THREE.Object3D;
};
type LODConfig = {
    levels: LODLevel$1[];
    hysteresis?: number;
};
declare class LODSystemPlugin implements Plugin {
    private config;
    name: string;
    private lodObjects;
    private camera;
    constructor(config: LODConfig[]);
    install({ camera, orchestrator }: PluginContext): void;
    dispose(): void;
}

type MeasurementEvent = {
    point: THREE.Vector3;
    distance?: number;
    points: THREE.Vector3[];
};
declare class MeasurementToolPlugin implements Plugin {
    name: string;
    private points;
    private line?;
    private spheres;
    private onMeasure?;
    constructor(onMeasure?: (event: MeasurementEvent) => void);
    install({ scene, camera, renderer, orchestrator }: PluginContext): void;
    private reset;
    dispose(): void;
}

declare class OrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    install({ camera, renderer }: PluginContext): void;
    dispose(): void;
}

type RaycasterEvent = {
    type: 'click';
    object: THREE.Object3D;
    point: THREE.Vector3;
} | {
    type: 'hover';
    object: THREE.Object3D;
    point: THREE.Vector3;
} | {
    type: 'leave';
    object: THREE.Object3D;
};
declare class RaycasterPlugin implements Plugin {
    name: string;
    private raycaster;
    private pointer;
    private hovered;
    private onEvent?;
    constructor(onEvent?: (event: RaycasterEvent) => void);
    install({ scene, camera, renderer }: PluginContext): void;
    private checkIntersection;
    private getIntersection;
    dispose(): void;
}

declare class PostProcessingPlugin implements Plugin {
    private options;
    name: string;
    private composer;
    private bloomPass;
    constructor(options?: {
        strength: number;
        radius: number;
        threshold: number;
    });
    install({ scene, camera, renderer }: PluginContext): void;
    setBloom(strength: number): void;
    dispose(): void;
}

declare const useScene: () => SceneOrchestrator;

type UseModelOptions = {
    draco?: boolean;
    autoLoad?: boolean;
};
declare const useModel: (entry: ManifestEntry | null, options?: UseModelOptions) => {
    model: THREE.Group<THREE.Object3DEventMap> | null;
    loading: boolean;
    error: Error | null;
    load: () => Promise<THREE.Group<THREE.Object3DEventMap>> | null;
};

declare const useActiveModel: () => THREE.Group | null;

declare const useHDRI: (entry: ManifestEntry | null) => {
    hdri: THREE.Texture | null;
    loading: boolean;
    clear: () => void;
};

declare const useRaycaster: (onEvent: (event: RaycasterEvent) => void) => void;

declare const useCache: () => {
    status: "error" | "idle" | "validating" | "ready";
    progress: number;
    report: CacheReport | null;
    validate: (manifest: ModelManifest) => Promise<CacheReport>;
};

declare const useAnimation: (clipName: string, play?: boolean) => void;

type AdvancedCameraCollisionProps = {
    distanceThreshold?: number;
    pushBackOffset?: number;
    enabled?: boolean;
};
declare const AdvancedCameraCollision: React.FC<AdvancedCameraCollisionProps>;

type AdvancedDragRaycasterProps = {
    children: (state: {
        isEnabled: boolean;
        toggleEnabled: () => void;
        setEnabled: (value: boolean) => void;
        resetAll: () => void;
        isResetting: boolean;
    }) => React.ReactNode;
    defaultEnabled?: boolean;
    enableRotationCompensation?: boolean;
    transitionDuration?: number;
    onDragStart?: (object: THREE.Object3D) => void;
    onDrag?: (object: THREE.Object3D, delta: THREE.Vector3) => void;
    onDragEnd?: (object: THREE.Object3D) => void;
};
declare const AdvancedDragRaycaster: React.FC<AdvancedDragRaycasterProps>;

type OrbitState = {
    panEnabled: boolean;
    rotateEnabled: boolean;
    zoomEnabled: boolean;
    isActive: boolean;
    setPanEnabled: (value: boolean) => void;
    setRotateEnabled: (value: boolean) => void;
    setZoomEnabled: (value: boolean) => void;
    setAllEnabled: (value: boolean) => void;
    togglePan: () => void;
    toggleRotate: () => void;
    toggleZoom: () => void;
    toggleAll: () => void;
};
type AdvancedOrbitControlsProps = {
    children: (state: OrbitState) => React.ReactNode;
    defaultEnabled?: boolean;
    panSpeed?: number;
    rotateSpeed?: number;
    zoomSpeed?: number;
    dampingFactor?: number;
    minDistance?: number;
    maxDistance?: number;
    minPolarAngle?: number;
    maxPolarAngle?: number;
};
declare const AdvancedOrbitControls: React.FC<AdvancedOrbitControlsProps>;

type AdvancedRaycasterProps = {
    model?: THREE.Object3D;
    onClick?: (e: any) => void;
    onHoverIn?: (e: any) => void;
    onHoverOut?: (e: any) => void;
    onHoverMove?: (e: any) => void;
    onDragStart?: (e: any) => void;
    onDrag?: (e: any) => void;
    onDragEnd?: (e: any) => void;
};
declare const AdvancedRaycaster: React.FC<AdvancedRaycasterProps>;

type AmbientLightProps = {
    intensity?: number;
    color?: THREE.ColorRepresentation;
};
declare const AmbientLight: React.FC<AmbientLightProps>;

type TimelineStep = {
    clipName: string;
    duration?: number;
    delay?: number;
};
type AnimationTimelineProps = {
    steps: TimelineStep[];
    loop?: boolean;
    autoplay?: boolean;
};
declare const AnimationTimeline: React.FC<AnimationTimelineProps>;

type Annotation = {
    id: string;
    position: [number, number, number];
    target?: THREE.Object3D | string;
    content: string | React.ReactNode;
    offset?: [number, number, number];
};
type AnnotationsProps = {
    annotations: Annotation[];
};
declare const Annotations: React.FC<AnnotationsProps>;

declare const ARButton: React.FC;

type AutoLODSystemProps = {
    mediumDistance?: number;
    lowDistance?: number;
    hideDistance?: number;
};
declare const AutoLODSystem: React.FC<AutoLODSystemProps>;

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

type DirectionalLightProps = {
    intensity?: number;
    color?: THREE.ColorRepresentation;
    position?: [number, number, number];
    castShadow?: boolean;
    shadowMapSize?: number;
};
declare const DirectionalLight: React.FC<DirectionalLightProps>;

type DistanceUnit = 'm' | 'cm' | 'mm' | 'px' | 'in' | 'ft' | 'km';
type DistanceDisplayProps = {
    children: (data: {
        distance: number;
        formatted: string;
        percentage: number;
        initialDistance: number;
        formattedInitial: string;
    }) => React.ReactNode;
    className?: string;
    unit?: DistanceUnit;
    decimals?: number;
};
declare const DistanceDisplay: React.FC<DistanceDisplayProps>;

type EnvironmentPresetName = 'studio' | 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'city' | 'park' | 'lobby';
type EnvironmentPresetProps = {
    name: EnvironmentPresetName;
    intensity?: number;
    blur?: number;
};
declare const EnvironmentPreset: React.FC<EnvironmentPresetProps>;

type Props = {
    children: ReactNode;
    fallback?: ReactNode;
};
type State = {
    hasError: boolean;
};
declare class ErrorBoundary3D extends Component<Props, State> {
    state: {
        hasError: boolean;
    };
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: any): void;
    render(): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | react_jsx_runtime.JSX.Element | null | undefined;
}

type SurfaceType = 'mirror' | 'glass' | 'metal' | 'concrete' | 'water' | 'wood' | 'custom';
type GroundSurfaceProps = {
    type?: SurfaceType;
    size?: number;
    height?: number;
    blur?: number;
    resolution?: number;
    color?: THREE.ColorRepresentation;
    roughness?: number;
    metalness?: number;
    opacity?: number;
    transparent?: boolean;
};
declare const GroundSurface: React.FC<GroundSurfaceProps>;

type HDRIProps = {
    entry: ManifestEntry;
};
declare const HDRI: React.FC<HDRIProps>;

type HotspotProps = {
    id: string;
    position: [number, number, number];
    target?: THREE.Object3D;
    onClick: () => void;
};
declare const Hotspot: React.FC<HotspotProps>;

type HotspotData = {
    id: string;
    position: [number, number, number];
    target?: THREE.Object3D | string;
    onClick: () => void;
    offset?: [number, number, number];
};
type HotspotsProps = {
    hotspots: HotspotData[];
};
declare const Hotspots: React.FC<HotspotsProps>;

type InstanceData = {
    position: THREE.Vector3;
    rotation?: THREE.Euler | THREE.Quaternion;
    scale?: THREE.Vector3 | number;
    color?: THREE.Color;
    visible?: boolean;
};
type InstancedModelProps = {
    entry: ManifestEntry;
    instances: InstanceData[];
    draco?: boolean;
    castShadow?: boolean;
    receiveShadow?: boolean;
};
declare const InstancedModel: React.FC<InstancedModelProps>;

type LODLevel = {
    distance: number;
    model: THREE.Object3D;
};
type LODSystemProps = {
    levels: LODLevel[];
    hysteresis?: number;
};
declare const LODSystem: React.FC<LODSystemProps>;

type MeasurementToolProps = {
    enabled?: boolean;
    color?: string;
    onMeasure?: (distance: number, points: [THREE.Vector3, THREE.Vector3]) => void;
};
declare const MeasurementTool: React.FC<MeasurementToolProps>;

type ModelProps = {
    entry: ManifestEntry;
    draco?: boolean | undefined;
    children?: (model: THREE.Group) => React.ReactNode;
};
declare const Model: React.FC<ModelProps>;

type ModelPreloadProps = {
    entries: ModelManifest;
    draco?: boolean;
};
declare const ModelPreload: React.FC<ModelPreloadProps>;

declare const OrbitControls: React.FC;

type PointLightProps = {
    intensity?: number;
    color?: THREE.ColorRepresentation;
    position?: [number, number, number];
    distance?: number;
    decay?: number;
};
declare const PointLight: React.FC<PointLightProps>;

type PostProcessingProps = {
    bloom?: {
        strength?: number;
        radius?: number;
        threshold?: number;
    };
    enabled?: boolean;
};
declare const PostProcessing: React.FC<PostProcessingProps>;

type RaycasterProps = {
    onClick?: (obj: THREE.Object3D) => void;
    onHover?: (obj: THREE.Object3D) => void;
};
declare const Raycaster: React.FC<RaycasterProps>;

type SpotLightProps = {
    intensity?: number;
    color?: THREE.ColorRepresentation;
    position?: [number, number, number];
    target?: THREE.Object3D | string;
    angle?: number;
    penumbra?: number;
    distance?: number;
    castShadow?: boolean;
};
declare const SpotLight: React.FC<SpotLightProps>;

type SuspenseProps = {
    children: ReactNode;
    fallback?: ReactNode | undefined;
    loadingMessage?: string;
};
declare const Suspense: React.FC<SuspenseProps>;

type SuspenseModelProps = {
    entry: ManifestEntry;
    draco?: boolean | undefined;
    fallback?: React.ReactNode;
    children?: (model: THREE.Group) => React.ReactNode;
};
declare const SuspenseModel: React.FC<SuspenseModelProps>;

type TheaterLightingProps = {
    intensity?: number;
    count?: number;
};
declare const TheaterLighting: React.FC<TheaterLightingProps>;

declare const VRButton: React.FC;

type AnimationItem = {
    name: string;
    playForward: () => void;
    playBackward: () => void;
    toggle: () => void;
    isPlaying: boolean;
    isReversed: boolean;
};
type AnimationControllerProps = {
    children: (animations: AnimationItem[]) => ReactNode;
    className?: string;
};
declare const AnimationController: React.FC<AnimationControllerProps>;

declare const LightingController: React.FC<{
    className?: string;
}>;

type SceneObjectProps = {
    object: THREE.Object3D;
    parent?: 'scene' | 'model' | THREE.Object3D | string;
    name?: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
    visible?: boolean;
    castShadow?: boolean;
    receiveShadow?: boolean;
};
/**
 * Primitiva universal para añadir cualquier objeto 3D
 * Puede ir en:
 * - La escena (scene)
 * - El modelo activo (model)
 * - Un objeto específico por nombre o referencia
 */
declare const SceneObject: React.FC<SceneObjectProps>;

export { ARButton, AdvancedCameraCollision, AdvancedCameraCollisionPlugin, AdvancedDragRaycaster, AdvancedOrbitControls, AdvancedOrbitControlsPlugin, AdvancedRaycaster, AdvancedRaycasterPlugin, AmbientLight, AnimationController, AnimationTimeline, Annotations, AnnotationsPlugin, AutoLODSystem, AutoLODSystemPlugin, type CacheEntry, CacheProvider, type CacheReport, CacheValidator, Canvas, type ClickEvent, type ColorRepresentation, type CustomMaterialFactory, type DeepPartial, DirectionalLight, DistanceDisplay, EnvironmentPreset, ErrorBoundary3D, FileWatcher, GLTFLoader, type GLTFLoaderEvents, type GLTFLoaderOptions, GroundSurface, HDRI, type HDRIEvents, HDRILoader, type HDRIProgress, Hotspot, HotspotPlugin, Hotspots, type HoverEvent, InstancedModel, LODSystem, LODSystemPlugin, type LightConfig, LightingController, type ManifestEntry, type MaterialConfig, MaterialController, type MeasurementEvent, MeasurementTool, MeasurementToolPlugin, Model, type ModelManifest, ModelPreload, ObjectCache, OrbitControls, OrbitControlsPlugin, type Plugin, type PluginContext, PointLight, PostProcessing, PostProcessingPlugin, Raycaster, type RaycasterEvent, RaycasterPlugin, type SceneConfig, SceneObject, SceneOrchestrator, SceneProvider, SpotLight, Suspense, SuspenseModel, THREE_VERSION, TheaterLighting, VRButton, type ValidationOptions, type Vector3Tuple, WebPHDRLoader, generateManifest, useActiveModel, useAnimation, useCache, useHDRI, useModel, useRaycaster, useScene };
