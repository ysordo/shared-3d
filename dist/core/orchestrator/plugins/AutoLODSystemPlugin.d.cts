import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-qQ99RpXe.cjs';
import 'three';
import '../../cache/types.cjs';

type AutoLODConfig = {
    distances: [number, number, number];
    reductionPercentages?: [number, number];
};
declare class AutoLODSystemPlugin implements Plugin {
    private config;
    name: string;
    private lods;
    private camera;
    constructor(config: AutoLODConfig);
    private simplifyGeometry;
    private createLODLevels;
    install({ camera, orchestrator }: PluginContext): void;
    dispose(): void;
}

export { AutoLODSystemPlugin };
