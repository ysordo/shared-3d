import { P as Plugin, b as PluginContext } from '../../../SceneOrchestrator-B4om0ttP.js';
import * as THREE from 'three';
import '../../cache/types.js';

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
