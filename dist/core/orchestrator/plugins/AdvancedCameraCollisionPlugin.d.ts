import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BNc555Bu.js';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';
import 'three';

declare class AdvancedCameraCollisionPlugin implements Plugin {
    distanceThreshold: number;
    pushBackOffset: number;
    smooth: number;
    name: string;
    private handle;
    constructor(distanceThreshold?: number, pushBackOffset?: number, smooth?: number);
    install({ camera, orchestrator }: PluginContext): void;
    update(distanceThreshold?: number, pushBackOffset?: number, smooth?: number): void;
    dispose(): void;
}

export { AdvancedCameraCollisionPlugin };
