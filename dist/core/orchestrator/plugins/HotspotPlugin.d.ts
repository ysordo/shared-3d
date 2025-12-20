import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BNc555Bu.js';
import * as THREE from 'three';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';

type HotspotData = {
    id: string;
    position: THREE.Vector3;
    target?: THREE.Object3D;
    onClick: () => void;
    visible?: boolean;
};
declare class HotspotPlugin implements Plugin {
    name: string;
    private scene;
    private camera?;
    private hotspots;
    private data;
    private _rafId;
    constructor(data: HotspotData[]);
    install({ scene, camera }: PluginContext): void;
    update(data: HotspotData[]): void;
    private syncHotspots;
    private addHotspot;
    private updateHotspot;
    private removeHotspot;
    private startLoop;
    dispose(): void;
}

export { type HotspotData, HotspotPlugin };
