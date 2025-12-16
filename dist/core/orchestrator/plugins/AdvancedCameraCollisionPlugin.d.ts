import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-rsjgaMlg.js';
import '../../loaders/GLTFLoader.js';
import '../../cache/types.js';
import 'three';
import '../../loaders/HDRILoader.js';

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
