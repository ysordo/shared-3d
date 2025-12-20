import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-uEPgybCc.cjs';
import '../../loaders/HDRILoader.cjs';
import '../../cache/types.cjs';
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
