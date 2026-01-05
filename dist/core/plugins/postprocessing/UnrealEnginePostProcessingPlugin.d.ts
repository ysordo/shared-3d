import * as POST from 'postprocessing';
import { FrameState } from './ureal-engine/FrameState.js';
import { VelocityPassPlugin } from './ureal-engine/VelocityPassPlugin.js';
import { AOPlugin } from './ureal-engine/AOPlugin.js';
import { GILitePlugin } from './ureal-engine/GILitePlugin.js';
import { BloomPlugin } from './ureal-engine/BloomPlugin.js';
import { MotionBlurPlugin } from './ureal-engine/MotionBlurPlugin.js';
import { TAAPlugin } from './ureal-engine/TAAPlugin.js';
import { SharpenEffect } from './ureal-engine/SharpenPlugin.js';
import { b as Plugin, P as PluginContext } from '../../../index-vk5WYF3C.js';
import * as THREE from 'three';
import '../../loaders/loaders.d.js';
import '../../cache/types.js';

type UnrealEnginePostProcessingConfig = {
    bloom?: {
        intensity?: number;
        luminanceThreshold?: number;
    };
    motionBlur?: {
        intensity?: number;
    };
    taa?: {
        blend?: number;
    };
    sharpen?: {
        strength?: number;
    };
    toneMappingExposure?: number;
};
declare class UnrealEnginePostProcessingPlugin implements Plugin {
    name: string;
    composer: POST.EffectComposer;
    frameState: FrameState;
    velocity: VelocityPassPlugin;
    ao: AOPlugin;
    gi: GILitePlugin;
    bloom: BloomPlugin;
    motion: MotionBlurPlugin;
    taa: TAAPlugin;
    sharpen: SharpenEffect;
    camera: THREE.PerspectiveCamera;
    domElement: HTMLElement;
    scene: THREE.Scene;
    private sceneRenderTarget;
    private config;
    constructor(config?: Partial<UnrealEnginePostProcessingConfig>);
    install({ scene, camera, renderer }: PluginContext): void;
    postRender(): void;
    resize(width: number, height: number): void;
    update(newConfig: Partial<UnrealEnginePostProcessingConfig>): void;
    dispose(): void;
}

export { type UnrealEnginePostProcessingConfig, UnrealEnginePostProcessingPlugin };
