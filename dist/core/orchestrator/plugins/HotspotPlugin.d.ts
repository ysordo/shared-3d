import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';
type HotspotData = {
    id: string;
    position: THREE.Vector3;
    target?: THREE.Object3D | undefined;
    onClick: () => void;
};
export declare class HotspotPlugin implements Plugin {
    private data;
    name: string;
    private hotspots;
    constructor(data: HotspotData[]);
    install({ scene }: PluginContext): void;
    dispose(): void;
}
export {};
//# sourceMappingURL=HotspotPlugin.d.ts.map