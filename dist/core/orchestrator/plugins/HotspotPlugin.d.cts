import { P as Plugin, b as PluginContext } from '../../../SceneOrchestrator-BeiVe8WF.cjs';
import * as THREE from 'three';
import '../../cache/types.cjs';

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
