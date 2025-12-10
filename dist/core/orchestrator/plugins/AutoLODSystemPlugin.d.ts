import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-IMvwSmmi.js';
import '../../cache/types.js';
import 'three';

type AutoLODConfig = {
    distances: [number, number, number];
    reductionPercentages?: [number, number];
};
declare class AutoLODSystemPlugin implements Plugin {
    private config;
    name: string;
    private lods;
    private camera;
    private rafId;
    private orchestrator;
    private originalSetModel?;
    constructor(config: AutoLODConfig);
    private simplifyGeometry;
    private createLODLevels;
    install({ camera, orchestrator }: PluginContext): void;
    dispose(): void;
}

export { AutoLODSystemPlugin };
