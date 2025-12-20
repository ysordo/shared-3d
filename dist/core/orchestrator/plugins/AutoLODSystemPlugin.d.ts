import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BNc555Bu.js';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';
import 'three';

type AutoLODConfig = {
    distances: [number, number, number];
    reductionPercentages?: [number, number] | undefined;
};
declare class AutoLODSystemPlugin implements Plugin {
    name: string;
    private lods;
    private camera;
    private rafId;
    private orchestrator;
    private originalSetModel?;
    private config;
    constructor(config: AutoLODConfig);
    /** Permite actualizar la configuración en caliente */
    update(newConfig: Partial<AutoLODConfig>): void;
    private simplifyGeometry;
    /** Reconstruye los niveles LOD para un modelo existente */
    private updateLODForModel;
    private createLODLevels;
    /** Aplica LOD a un modelo específico, reutilizando si ya existe */
    private applyLODToModel;
    install({ camera, orchestrator }: PluginContext): void;
    dispose(): void;
}

export { type AutoLODConfig, AutoLODSystemPlugin };
