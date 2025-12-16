import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-oKj90s6N.cjs';
import '../../loaders/GLTFLoader.cjs';
import '../../cache/types.cjs';
import 'three';
import '../../loaders/HDRILoader.cjs';

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
