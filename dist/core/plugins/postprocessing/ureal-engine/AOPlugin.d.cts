import { SSAOEffect } from 'postprocessing';
import * as THREE from 'three';

declare class AOPlugin {
    effect: SSAOEffect;
    private normalPass;
    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer);
    resize(width: number, height: number): void;
    preRender(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void;
}

export { AOPlugin };
