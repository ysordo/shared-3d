import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-DI3vK_io.cjs';
import '../../cache/types.cjs';
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
