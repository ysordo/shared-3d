import { b as Plugin, P as PluginContext } from '../../index-vk5WYF3C.js';
import '../loaders/loaders.d.js';
import 'three';
import '../cache/types.js';

type CinematicPostProcessingConfig = {
    enabled?: boolean;
    toneMappingExposure?: number;
    vignette?: {
        darkness?: number;
        offset?: number;
    };
    filmGrain?: {
        intensity?: number;
    };
    antiAlias?: boolean;
};
declare class CinematicPostProcessingPlugin implements Plugin {
    readonly name = "CinematicPostProcessing";
    private composer;
    private vignettePass;
    private grainPass;
    private config;
    private clock;
    constructor(config?: Partial<CinematicPostProcessingConfig>);
    install({ scene, camera, renderer }: PluginContext): void;
    postRender(): void;
    resize(width: number, height: number): void;
    update(newConfig: Partial<CinematicPostProcessingConfig>): void;
    dispose(): void;
}

export { type CinematicPostProcessingConfig, CinematicPostProcessingPlugin };
