import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-s_G1EW88.js';
import 'three';
import '../../cache/types.js';

declare class PostProcessingPlugin implements Plugin {
    private options;
    name: string;
    private composer;
    private bloomPass;
    constructor(options?: {
        strength: number;
        radius: number;
        threshold: number;
    });
    install({ scene, camera, renderer }: PluginContext): void;
    setBloom(strength: number): void;
    dispose(): void;
}

export { PostProcessingPlugin };
