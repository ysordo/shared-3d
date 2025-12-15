import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-0U6fAu6q.js';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';
import 'three';

declare class AdvancedCameraCollisionPlugin implements Plugin {
    readonly distanceThreshold: number;
    readonly pushBackOffset: number;
    readonly smooth: number;
    name: string;
    private handle;
    constructor(distanceThreshold?: number, pushBackOffset?: number, smooth?: number);
    install({ camera, orchestrator }: PluginContext): void;
    dispose(): void;
}

export { AdvancedCameraCollisionPlugin };
