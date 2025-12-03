import { P as Plugin, b as PluginContext } from '../../../SceneOrchestrator-B4om0ttP.js';
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
