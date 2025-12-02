import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';
type LODLevel = {
    distance: number;
    model: THREE.Object3D;
};
type LODConfig = {
    levels: LODLevel[];
    hysteresis?: number;
};
export declare class LODSystemPlugin implements Plugin {
    private config;
    name: string;
    private lodObjects;
    private camera;
    constructor(config: LODConfig[]);
    install({ camera, orchestrator }: PluginContext): void;
    dispose(): void;
}
export {};
//# sourceMappingURL=LODSystemPlugin.d.ts.map