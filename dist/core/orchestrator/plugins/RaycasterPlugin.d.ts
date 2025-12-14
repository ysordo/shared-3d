import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BMDHZMn7.js';
import * as THREE from 'three';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';

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
