import { THREE } from '..';
import { EventDispatcher } from 'three';
export interface RaycastHit {
    object: THREE.Object3D | null;
    point: THREE.Vector3 | null;
    distance: number | null;
    face?: THREE.Face | null;
    faceIndex?: number | null;
}
export declare class RaycasterManager extends EventDispatcher {
    private raycaster;
    private pointer;
    private scene?;
    private camera?;
    private domElement;
    private model?;
    private isEnabled;
    private isPointerDown;
    private lastHoverObject;
    private isTouchDevice;
    private isDragging;
    private dragStartPosition;
    private currentDragObject;
    private lastTapTime;
    private tapDelay;
    private interactableObjects;
    constructor(domElement: HTMLElement);
    setModel(model: THREE.Object3D): void;
    private detectTouchDevice;
    initialize(scene: THREE.Scene, camera: THREE.Camera): void;
    setEnabled(enabled: boolean): void;
    private attachEvents;
    private detachEvents;
    private updatePointerPosition;
    private onPointerMove;
    private onPointerDown;
    private onPointerUp;
    private onClick;
    private onTouchStart;
    private onTouchEnd;
    private onTouchMove;
    private handleTap;
    private onContextMenu;
    private raycast;
    private performRaycast;
    private clearHoverState;
    raycastAtPosition(normalizedX: number, normalizedY: number): RaycastHit[];
    dispose(): void;
}
//# sourceMappingURL=RaycasterManager.d.ts.map