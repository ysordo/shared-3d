import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { THREE } from '..';
export declare class OrbitControlsManager extends OrbitControls {
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
    private hdriSphere?;
    constructor(camera: THREE.Camera, domElement: HTMLElement);
    setModel(model: THREE.Object3D): void;
    setHdriSphere(sphere: THREE.Object3D): void;
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