import { b as Plugin, P as PluginContext } from '../../../index-vk5WYF3C.js';
import '../../loaders/loaders.d.js';
import 'three';
import '../../cache/types.js';

type HighResPostProcessingConfig = {
    enabled?: boolean;
    toneMappingExposure?: number;
    multisampling?: number;
    aaType?: 'smaa' | 'fxaa' | 'none';
    superSampling?: number;
};
declare class HighResPostProcessingPlugin implements Plugin {
    readonly name = "HighResPostProcessing";
    private composer;
    private config;
    constructor(config?: Partial<HighResPostProcessingConfig>);
    install({ scene, camera, renderer }: PluginContext): void;
    postRender(): void;
    resize(width: number, height: number): void;
    update(newConfig: Partial<HighResPostProcessingConfig>): void;
    dispose(): void;
}

export { type HighResPostProcessingConfig, HighResPostProcessingPlugin };
