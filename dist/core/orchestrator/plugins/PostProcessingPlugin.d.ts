import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BNc555Bu.js';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';
import 'three';

type PostProcessingConfig = {
    enabled?: boolean;
    bloom?: {
        strength?: number;
        radius?: number;
        threshold?: number;
    };
};
declare class PostProcessingPlugin implements Plugin {
    name: string;
    private composer;
    private bloomPass;
    private enabled;
    private config;
    constructor(config?: PostProcessingConfig);
    install({ scene, camera, renderer }: PluginContext): void;
    render(): void;
    resize(width: number, height: number): void;
    update(config: Partial<PostProcessingConfig>): void;
    dispose(): void;
}

export { type PostProcessingConfig, PostProcessingPlugin };
