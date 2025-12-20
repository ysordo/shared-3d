import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-uEPgybCc.cjs';
import * as THREE from 'three';
import '../../loaders/HDRILoader.cjs';
import '../../cache/types.cjs';

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
type RaycasterConfig = {
    enabled?: boolean | undefined;
    objects?: THREE.Object3D[] | undefined;
    onEvent?: (event: RaycasterEvent) => void | undefined;
};
declare class RaycasterPlugin implements Plugin {
    name: string;
    private raycaster;
    private pointer;
    private hovered;
    private scene;
    private camera;
    private dom;
    private enabled;
    private objects;
    private onEvent;
    constructor(config?: RaycasterConfig);
    install({ scene, camera, renderer }: PluginContext): void;
    private onPointerMove;
    private onClick;
    private checkIntersection;
    private getIntersection;
    private updatePointer;
    update(config: {
        objects?: THREE.Object3D[] | undefined;
        onEvent?: (event: RaycasterEvent) => void | undefined;
        enabled?: boolean | undefined;
    }): void;
    setEnabled(enabled: boolean): void;
    dispose(): void;
}

export { type RaycasterEvent, RaycasterPlugin };
