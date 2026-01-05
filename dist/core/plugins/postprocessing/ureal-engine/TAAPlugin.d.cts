import { Effect } from 'postprocessing';
import * as THREE from 'three';
import { VelocityPassPlugin } from './VelocityPassPlugin.cjs';

declare class TAAPlugin {
    effect: Effect;
    private previousFrame;
    private velocityPass;
    private blend;
    constructor(camera: THREE.PerspectiveCamera, velocityPass: VelocityPassPlugin, renderer: THREE.WebGLRenderer, blend?: number);
    update(previousFrameTexture: THREE.Texture): void;
    resize(width: number, height: number): void;
}

export { TAAPlugin };
