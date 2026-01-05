import * as THREE from 'three';

declare class FrameState {
    frame: number;
    jitter: THREE.Vector2;
    resolutionScale: number;
    private halton;
    update(camera: THREE.PerspectiveCamera, width: number, height: number): void;
    reset(camera: THREE.PerspectiveCamera): void;
}

export { FrameState };
