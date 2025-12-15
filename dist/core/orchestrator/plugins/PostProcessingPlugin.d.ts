import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-0U6fAu6q.js';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';
import 'three';

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
