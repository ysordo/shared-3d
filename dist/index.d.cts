export { SceneProvider } from './context/SceneContext.cjs';
export { CacheProvider } from './context/CacheContext.cjs';
export { CacheValidator, ValidationOptions } from './core/cache/CacheValidator.cjs';
export { FileWatcher } from './core/cache/FileWatcher.cjs';
export { ObjectCache } from './core/cache/ObjectCache.cjs';
export { CacheEntry, CacheReport, ManifestEntry, ModelManifest } from './core/cache/types.cjs';
export { GLTFLoader, GLTFLoaderEvents, GLTFLoaderOptions } from './core/loaders/GLTFLoader.cjs';
export { HDRIEvents, HDRILoader, HDRIProgress } from './core/loaders/HDRILoader.cjs';
export { WebPHDRLoader } from './core/loaders/WebPHDRLoader.cjs';
export { P as Plugin, b as PluginContext, S as SceneConfig, a as SceneOrchestrator } from './SceneOrchestrator-BeiVe8WF.cjs';
export { AdvancedCameraCollisionPlugin } from './core/orchestrator/plugins/AdvancedCameraCollisionPlugin.cjs';
export { AdvancedOrbitControlsPlugin } from './core/orchestrator/plugins/AdvancedOrbitControlsPlugin.cjs';
export { AdvancedRaycasterPlugin } from './core/orchestrator/plugins/AdvancedRaycasterPlugin.cjs';
export { AnnotationsPlugin } from './core/orchestrator/plugins/AnnotationsPlugin.cjs';
export { AutoLODSystemPlugin } from './core/orchestrator/plugins/AutoLODSystemPlugin.cjs';
export { HotspotPlugin } from './core/orchestrator/plugins/HotspotPlugin.cjs';
export { LODSystemPlugin } from './core/orchestrator/plugins/LODSystemPlugin.cjs';
export { MeasurementEvent, MeasurementToolPlugin } from './core/orchestrator/plugins/MeasurementToolPlugin.cjs';
export { OrbitControlsPlugin } from './core/orchestrator/plugins/OrbitControlsPlugin.cjs';
export { RaycasterEvent, RaycasterPlugin } from './core/orchestrator/plugins/RaycasterPlugin.cjs';
export { PostProcessingPlugin } from './core/orchestrator/plugins/PostProcessingPlugin.cjs';
export { useScene } from './hooks/useScene.cjs';
export { useModel } from './hooks/useModel.cjs';
export { useActiveModel } from './hooks/useActiveModel.cjs';
export { useHDRI } from './hooks/useHDRI.cjs';
export { useRaycaster } from './hooks/useRaycaster.cjs';
export { useCache } from './hooks/useCache.cjs';
export { useAnimation } from './hooks/useAnimation.cjs';
export { THREE_VERSION } from './lib/three.cjs';
import * as THREE from 'three';
export { THREE };
export { AdvancedCameraCollision } from './react/components/AdvancedCameraCollision.cjs';
export { AdvancedDragRaycaster } from './react/components/AdvancedDragRaycaster.cjs';
export { AdvancedOrbitControls } from './react/components/AdvancedOrbitControls.cjs';
export { AdvancedRaycaster } from './react/components/AdvancedRaycaster.cjs';
export { AmbientLight } from './react/components/AmbientLight.cjs';
export { AnimationTimeline } from './react/components/AnimationTimeline.cjs';
export { Annotations } from './react/components/Annotations.cjs';
export { ARButton } from './react/components/ARButton.cjs';
export { AutoLODSystem } from './react/components/AutoLODSystem.cjs';
export { Canvas } from './react/components/Canvas.cjs';
export { DirectionalLight } from './react/components/DirectionalLight.cjs';
export { DistanceDisplay } from './react/components/DistanceDisplay.cjs';
export { EnvironmentPreset } from './react/components/EnvironmentPreset.cjs';
export { ErrorBoundary3D } from './react/components/ErrorBoundary3D.cjs';
export { GroundSurface } from './react/components/GroundSurface.cjs';
export { HDRI } from './react/components/HDRI.cjs';
export { Hotspot } from './react/components/Hotspot.cjs';
export { Hotspots } from './react/components/Hotspots.cjs';
export { InstancedModel } from './react/components/InstancedModel.cjs';
export { LODSystem } from './react/components/LODSystem.cjs';
export { MeasurementTool } from './react/components/MeasurementTool.cjs';
export { Model } from './react/components/Model.cjs';
export { ModelPreload } from './react/components/ModelPreload.cjs';
export { OrbitControls } from './react/components/OrbitControls.cjs';
export { PointLight } from './react/components/PointLight.cjs';
export { PostProcessing } from './react/components/PostProcessing.cjs';
export { Raycaster } from './react/components/Raycaster.cjs';
export { SpotLight } from './react/components/SpotLight.cjs';
export { Suspense } from './react/components/Suspense.cjs';
export { SuspenseModel } from './react/components/SuspenseModel.cjs';
export { TheaterLighting } from './react/components/TheaterLighting.cjs';
export { VRButton } from './react/components/VRButton.cjs';
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
