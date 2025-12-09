import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-_d3tKqav.cjs';
import 'three';
import '../../cache/types.cjs';

declare class AdvancedCameraCollisionPlugin implements Plugin {
    readonly distanceThreshold: number;
    readonly pushBackOffset: number;
    name: string;
    private handle;
    constructor(distanceThreshold?: number, pushBackOffset?: number);
    install({ camera, orchestrator }: PluginContext): void;
    dispose(): void;
}

export { AdvancedCameraCollisionPlugin };
