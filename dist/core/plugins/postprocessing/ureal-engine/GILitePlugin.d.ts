import { Effect } from 'postprocessing';
import * as THREE from 'three';
import { b as Plugin, P as PluginContext } from '../../../../index-vk5WYF3C.js';
import { VelocityPassPlugin } from './VelocityPassPlugin.js';
import '../../../loaders/loaders.d.js';
import '../../../cache/types.js';

declare class GILitePlugin implements Plugin {
    readonly name = "GILite";
    effect: Effect;
    private velocityPass;
    private renderTarget;
    constructor(velocityPass: VelocityPassPlugin, renderTarget: THREE.WebGLRenderTarget);
    install(__context: PluginContext): void;
    renderScene(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void;
    resize(width: number, height: number): void;
}

export { GILitePlugin };
