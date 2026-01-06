import * as POST from 'postprocessing';
import { FrameState } from './ureal-engine/FrameState.cjs';
import { VelocityPassPlugin } from './ureal-engine/VelocityPassPlugin.cjs';
import { AOPlugin } from './ureal-engine/AOPlugin.cjs';
import { GILitePlugin } from './ureal-engine/GILitePlugin.cjs';
import { BloomPlugin } from './ureal-engine/BloomPlugin.cjs';
import { MotionBlurPlugin } from './ureal-engine/MotionBlurPlugin.cjs';
import { TAAPlugin } from './ureal-engine/TAAPlugin.cjs';
import { SharpenEffect } from './ureal-engine/SharpenEffect.cjs';
import { b as Plugin, P as PluginContext } from '../../../index-DE4jh8VF.cjs';
import * as THREE from 'three';
import '../../loaders/loaders.d.cjs';
import '../../cache/types.cjs';

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
    lodLevels?: number;
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
    private lodGroup;
    private config;
    constructor(config?: Partial<UnrealEnginePostProcessingConfig>);
    install(context: PluginContext): void;
    private setupNaniteLOD;
    private decimateGeometry;
    postRender(): void;
    resize(width: number, height: number): void;
    update(newConfig: Partial<UnrealEnginePostProcessingConfig>): void;
    dispose(): void;
}

export { type UnrealEnginePostProcessingConfig, UnrealEnginePostProcessingPlugin };
