import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-_d3tKqav.cjs';
import * as THREE from 'three';
import '../../cache/types.cjs';

type LODLevel = {
    distance: number;
    model: THREE.Object3D;
};
type LODConfig = {
    levels: LODLevel[];
    hysteresis?: number;
};
declare class LODSystemPlugin implements Plugin {
    private config;
    name: string;
    private lodObjects;
    private camera;
    constructor(config: LODConfig[]);
    install({ camera, orchestrator }: PluginContext): void;
    dispose(): void;
}

export { LODSystemPlugin };
