import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-rsjgaMlg.js';
import * as THREE from 'three';
import '../../loaders/GLTFLoader.js';
import '../../cache/types.js';
import '../../loaders/HDRILoader.js';

type HotspotData = {
    id: string;
    position: THREE.Vector3;
    target?: THREE.Object3D | undefined;
    onClick: () => void;
};
declare class HotspotPlugin implements Plugin {
    private data;
    name: string;
    private hotspots;
    constructor(data: HotspotData[]);
    install({ scene }: PluginContext): void;
    dispose(): void;
}

export { HotspotPlugin };
