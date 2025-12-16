import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-oKj90s6N.cjs';
import '../../loaders/GLTFLoader.cjs';
import '../../cache/types.cjs';
import 'three';
import '../../loaders/HDRILoader.cjs';

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
