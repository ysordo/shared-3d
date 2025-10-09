import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { THREE } from '..';
export declare class OrbitControlsManager extends OrbitControls {
    scene: THREE.Scene;
    camera: THREE.Camera;
    domElement: HTMLElement;
    private model?;
    eRotate: boolean;
    ePan: boolean;
    eZoom: boolean;
    private isRotating;
    private isPanning;
    private isZooming;
    private startMousePosition;
    private currentMousePosition;
    private startPointerPosition;
    private currentPointerPosition;
    private previousTouchDistance;
    constructor(scene: THREE.Scene, camera: THREE.Camera, domElement: HTMLElement);
    setModel(model: THREE.Object3D): void;
    private setupEvents;
    private handleWheelZoom;
    private applyCameraZoom;
    private getPointerPosition;
    private onPointerDown;
    private onPointerMove;
    private onPointerUp;
    private onTouchStart;
    private onTouchMove;
    private onTouchEnd;
    private handleModelRotation;
    private handleModelPan;
    dispose(): void;
}
//# sourceMappingURL=OrbitControlsManager.d.ts.map