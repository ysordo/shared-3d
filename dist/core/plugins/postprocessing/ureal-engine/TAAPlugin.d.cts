import { Effect } from 'postprocessing';
import * as THREE from 'three';
import { b as Plugin, P as PluginContext } from '../../../../index-DE4jh8VF.cjs';
import { VelocityPassPlugin } from './VelocityPassPlugin.cjs';
import '../../../loaders/loaders.d.cjs';
import '../../../cache/types.cjs';

declare class TAAPlugin implements Plugin {
    readonly name = "TAA";
    effect: Effect;
    private previousFrame;
    private velocityPass;
    private blend;
    constructor(velocityPass: VelocityPassPlugin, blend?: number);
    install({ renderer }: PluginContext): void;
    update(previousFrameTexture?: THREE.Texture): void;
    setBlend(blend: number): void;
    resize(width: number, height: number): void;
}

export { TAAPlugin };
