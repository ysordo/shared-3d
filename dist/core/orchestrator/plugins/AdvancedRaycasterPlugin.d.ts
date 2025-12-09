import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-DfGaWCgX.js';
import * as THREE from 'three';
import '../../cache/types.js';

declare class RaycasterManager extends THREE.EventDispatcher {
    private raycaster;
    private pointer;
    private scene?;
    private camera?;
    private domElement;
    private interactableObjects;
    private lastHoverObject;
    private isEnabled;
    private isDragging;
    private currentDragObject;
    private dragStartPosition;
    private lastRaycastTime;
    private raycastThrottleMs;
    constructor(domElement: HTMLElement);
    setModel(model: THREE.Object3D): void;
    private isInteractable;
    initialize(scene: THREE.Scene, camera: THREE.Camera): void;
    setEnabled(enabled: boolean): void;
    private attachEvents;
    private detachEvents;
    private onPointerMove;
    private onPointerDown;
    private onPointerUp;
    private onClick;
    private handleDrag;
    private throttledRaycast;
    private raycast;
    private performRaycast;
    private updatePointer;
    private clearHoverState;
    private onContextMenu;
    private onTouchStart;
    private onTouchMove;
    private onTouchEnd;
}
declare class AdvancedRaycasterPlugin implements Plugin {
    private model?;
    private onEvent?;
    name: string;
    private _manager;
    constructor(model?: THREE.Object3D | undefined, onEvent?: ((event: unknown) => void) | undefined);
    install({ scene, camera, renderer, orchestrator }: PluginContext): void;
    dispose(): void;
    get manager(): RaycasterManager;
}

export { AdvancedRaycasterPlugin };
