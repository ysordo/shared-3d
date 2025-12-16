import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BxRG1S6N.cjs';
import * as THREE from 'three';
import '../../loaders/GLTFLoader.cjs';
import '../../cache/types.cjs';
import '../../loaders/HDRILoader.cjs';

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
