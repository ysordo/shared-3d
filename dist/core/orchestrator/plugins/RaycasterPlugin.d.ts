import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-rsjgaMlg.js';
import * as THREE from 'three';
import '../../loaders/GLTFLoader.js';
import '../../cache/types.js';
import '../../loaders/HDRILoader.js';

type RaycasterEvent = {
    type: 'click';
    object: THREE.Object3D;
    point: THREE.Vector3;
} | {
    type: 'hover';
    object: THREE.Object3D;
    point: THREE.Vector3;
} | {
    type: 'leave';
    object: THREE.Object3D;
};
declare class RaycasterPlugin implements Plugin {
    name: string;
    private raycaster;
    private pointer;
    private hovered;
    private onEvent?;
    constructor(onEvent?: (event: RaycasterEvent) => void);
    install({ scene, camera, renderer }: PluginContext): void;
    private checkIntersection;
    private getIntersection;
    dispose(): void;
}

export { type RaycasterEvent, RaycasterPlugin };
