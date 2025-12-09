import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-nyu4nGoT.cjs';
import 'three';
import '../../cache/types.cjs';

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
