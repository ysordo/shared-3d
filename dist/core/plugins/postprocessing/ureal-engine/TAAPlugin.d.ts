import { Effect } from 'postprocessing';
import * as THREE from 'three';
import { b as Plugin, P as PluginContext } from '../../../../index-vk5WYF3C.js';
import { VelocityPassPlugin } from './VelocityPassPlugin.js';
import '../../../loaders/loaders.d.js';
import '../../../cache/types.js';

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
