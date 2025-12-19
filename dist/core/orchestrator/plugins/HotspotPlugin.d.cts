import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-uEPgybCc.cjs';
import * as THREE from 'three';
import '../../loaders/HDRILoader.cjs';
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
