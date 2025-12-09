import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-s_G1EW88.js';
import 'three';
import '../../cache/types.js';

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
