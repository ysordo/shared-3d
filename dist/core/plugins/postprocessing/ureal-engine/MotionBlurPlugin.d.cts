import { Effect } from 'postprocessing';
import { VelocityPassPlugin } from './VelocityPassPlugin.cjs';
import * as THREE from 'three';
import { b as Plugin, P as PluginContext } from '../../../../index-DE4jh8VF.cjs';
import '../../../loaders/loaders.d.cjs';
import '../../../cache/types.cjs';

type MotionBlurPluginConfig = {
    intensity?: number;
    texture?: THREE.Texture | undefined;
};
declare const DEFAULT_MOTION_BLUR_CONFIG: Required<MotionBlurPluginConfig>;
declare class MotionBlurPlugin implements Plugin {
    readonly name = "MotionBlur";
    effect: Effect;
    private velocityPass;
    private config;
    constructor(velocityPass: VelocityPassPlugin, intensity?: MotionBlurPluginConfig['intensity']);
    install({ renderer }: PluginContext): void;
    update?(newConfig: Partial<MotionBlurPluginConfig>): void;
}

export { DEFAULT_MOTION_BLUR_CONFIG, MotionBlurPlugin, type MotionBlurPluginConfig };
