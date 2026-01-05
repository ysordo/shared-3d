import { Effect } from 'postprocessing';
import * as THREE from 'three';
import { VelocityPassPlugin } from './VelocityPassPlugin.js';

declare class GILitePlugin {
    effect: Effect;
    private velocityPass;
    private renderTarget;
    constructor(velocityPass: VelocityPassPlugin, renderer: THREE.WebGLRenderTarget);
    renderScene(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void;
    resize(width: number, height: number): void;
}

export { GILitePlugin };
