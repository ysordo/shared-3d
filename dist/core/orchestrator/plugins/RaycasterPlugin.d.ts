import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';
export type RaycasterEvent = {
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
export declare class RaycasterPlugin implements Plugin {
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
//# sourceMappingURL=RaycasterPlugin.d.ts.map