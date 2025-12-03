export { SceneProvider } from './context/SceneContext.js';
export { CacheProvider } from './context/CacheContext.js';
export { CacheValidator, ValidationOptions } from './core/cache/CacheValidator.js';
export { FileWatcher } from './core/cache/FileWatcher.js';
export { ObjectCache } from './core/cache/ObjectCache.js';
export { CacheEntry, CacheReport, ManifestEntry, ModelManifest } from './core/cache/types.js';
export { GLTFLoader, GLTFLoaderEvents, GLTFLoaderOptions } from './core/loaders/GLTFLoader.js';
export { HDRIEvents, HDRILoader, HDRIProgress } from './core/loaders/HDRILoader.js';
export { WebPHDRLoader } from './core/loaders/WebPHDRLoader.js';
export { P as Plugin, b as PluginContext, S as SceneConfig, a as SceneOrchestrator } from './SceneOrchestrator-B4om0ttP.js';
export { AdvancedCameraCollisionPlugin } from './core/orchestrator/plugins/AdvancedCameraCollisionPlugin.js';
export { AdvancedOrbitControlsPlugin } from './core/orchestrator/plugins/AdvancedOrbitControlsPlugin.js';
export { AdvancedRaycasterPlugin } from './core/orchestrator/plugins/AdvancedRaycasterPlugin.js';
export { AnnotationsPlugin } from './core/orchestrator/plugins/AnnotationsPlugin.js';
export { AutoLODSystemPlugin } from './core/orchestrator/plugins/AutoLODSystemPlugin.js';
export { HotspotPlugin } from './core/orchestrator/plugins/HotspotPlugin.js';
export { LODSystemPlugin } from './core/orchestrator/plugins/LODSystemPlugin.js';
export { MeasurementEvent, MeasurementToolPlugin } from './core/orchestrator/plugins/MeasurementToolPlugin.js';
export { OrbitControlsPlugin } from './core/orchestrator/plugins/OrbitControlsPlugin.js';
export { RaycasterEvent, RaycasterPlugin } from './core/orchestrator/plugins/RaycasterPlugin.js';
export { PostProcessingPlugin } from './core/orchestrator/plugins/PostProcessingPlugin.js';
export { useScene } from './hooks/useScene.js';
export { useModel } from './hooks/useModel.js';
export { useActiveModel } from './hooks/useActiveModel.js';
export { useHDRI } from './hooks/useHDRI.js';
export { useRaycaster } from './hooks/useRaycaster.js';
export { useCache } from './hooks/useCache.js';
export { useAnimation } from './hooks/useAnimation.js';
export { THREE_VERSION } from './lib/three.js';
import * as THREE from 'three';
export { THREE };
export { AdvancedCameraCollision } from './react/components/AdvancedCameraCollision.js';
export { AdvancedDragRaycaster } from './react/components/AdvancedDragRaycaster.js';
export { AdvancedOrbitControls } from './react/components/AdvancedOrbitControls.js';
export { AdvancedRaycaster } from './react/components/AdvancedRaycaster.js';
export { AmbientLight } from './react/components/AmbientLight.js';
export { AnimationTimeline } from './react/components/AnimationTimeline.js';
export { Annotations } from './react/components/Annotations.js';
export { ARButton } from './react/components/ARButton.js';
export { AutoLODSystem } from './react/components/AutoLODSystem.js';
export { Canvas } from './react/components/Canvas.js';
export { DirectionalLight } from './react/components/DirectionalLight.js';
export { DistanceDisplay } from './react/components/DistanceDisplay.js';
export { EnvironmentPreset } from './react/components/EnvironmentPreset.js';
export { ErrorBoundary3D } from './react/components/ErrorBoundary3D.js';
export { GroundSurface } from './react/components/GroundSurface.js';
export { HDRI } from './react/components/HDRI.js';
export { Hotspot } from './react/components/Hotspot.js';
export { Hotspots } from './react/components/Hotspots.js';
export { InstancedModel } from './react/components/InstancedModel.js';
export { LODSystem } from './react/components/LODSystem.js';
export { MeasurementTool } from './react/components/MeasurementTool.js';
export { Model } from './react/components/Model.js';
export { ModelPreload } from './react/components/ModelPreload.js';
export { OrbitControls } from './react/components/OrbitControls.js';
export { PointLight } from './react/components/PointLight.js';
export { PostProcessing } from './react/components/PostProcessing.js';
export { Raycaster } from './react/components/Raycaster.js';
export { SpotLight } from './react/components/SpotLight.js';
export { Suspense } from './react/components/Suspense.js';
export { SuspenseModel } from './react/components/SuspenseModel.js';
export { TheaterLighting } from './react/components/TheaterLighting.js';
export { VRButton } from './react/components/VRButton.js';
import React, { ReactNode } from 'react';
export { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export { GLTFLoader as ThreeGLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export { DRACOLoader as ThreeDRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
export { RGBELoader as ThreeRGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
export { EXRLoader as ThreeEXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
export { EffectComposer as ThreeEffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
export { RenderPass as ThreeRenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
export { UnrealBloomPass as ThreeUnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import 'react/jsx-runtime';

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

export { AnimationController, type ClickEvent, type ColorRepresentation, type CustomMaterialFactory, type DeepPartial, type HoverEvent, type LightConfig, LightingController, type MaterialConfig, MaterialController, SceneObject, type Vector3Tuple };
