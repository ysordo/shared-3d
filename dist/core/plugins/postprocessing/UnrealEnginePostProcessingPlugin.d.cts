import * as POST from 'postprocessing';
import { FrameState } from './ureal-engine/FrameState.cjs';
import { VelocityPassPlugin } from './ureal-engine/VelocityPassPlugin.cjs';
import { AOPlugin } from './ureal-engine/AOPlugin.cjs';
import { GILitePlugin } from './ureal-engine/GILitePlugin.cjs';
import { BloomPlugin } from './ureal-engine/BloomPlugin.cjs';
import { MotionBlurPlugin } from './ureal-engine/MotionBlurPlugin.cjs';
import { TAAPlugin } from './ureal-engine/TAAPlugin.cjs';
import { SharpenEffect } from './ureal-engine/SharpenPlugin.cjs';
import { b as Plugin, P as PluginContext } from '../../../index-DE4jh8VF.cjs';
import * as THREE from 'three';
import '../../loaders/loaders.d.cjs';
import '../../cache/types.cjs';

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
    install({ scene, camera, renderer }: PluginContext): void;
    postRender(): void;
    resize(width: number, height: number): void;
    dispose(): void;
}

export { UnrealEnginePostProcessingPlugin };
