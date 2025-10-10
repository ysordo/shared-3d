import type { Box3, Scene, WebGLRenderer } from 'three';
import { PerspectiveCamera, Vector3 } from 'three';
import { EffectComposer } from 'three/examples/jsm/Addons';
import type { OrbitControlsManager } from './OrbitControlsManager';
export declare class CameraManager extends PerspectiveCamera {
    private canvas;
    name: string;
    fov: number;
    near: number;
    far: number;
    postProcessingEnabled: boolean;
    composer?: EffectComposer;
    private readonly NEAR_MARGIN;
    private readonly FAR_MULTIPLIER;
    private readonly MARGIN;
    constructor(canvas: HTMLCanvasElement, name?: string, fov?: number, near?: number, far?: number);
    resize(box: Box3, pixelRatio: number): void;
    setupPostProcessing(scene: Scene, render: WebGLRenderer): void;
    reset(controls?: OrbitControlsManager, pos?: Vector3, target?: Vector3): void;
    toAnimIPos(controls?: OrbitControlsManager, pos?: Vector3, target?: Vector3, duration?: number): void;
    adjustClippingPlanes(center: Vector3, radius?: number, skyboxRadius?: number): void;
    recalculate(box: Box3): {
        radius: number;
        position: Vector3;
    };
}
//# sourceMappingURL=CameraManager.d.ts.map