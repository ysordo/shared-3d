import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BNc555Bu.js';
import * as THREE from 'three';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';

type LODLevel = {
    distance: number;
    model: THREE.Object3D;
};
type LODConfig = {
    levels: LODLevel[];
    hysteresis?: number;
};
declare class LODSystemPlugin implements Plugin {
    name: string;
    private camera;
    private orchestrator;
    private config;
    private lods;
    private rafId;
    private originalSetModel?;
    constructor(config: LODConfig);
    update(config: Partial<LODConfig>): void;
    install({ camera, orchestrator }: PluginContext): void;
    private applyLOD;
    private buildLODLevels;
    private rebuildLOD;
    private startLoop;
    dispose(): void;
}

export { type LODConfig, LODSystemPlugin };
