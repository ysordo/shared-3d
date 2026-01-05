import { b as Plugin, P as PluginContext } from '../../../index-DE4jh8VF.cjs';
import '../../loaders/loaders.d.cjs';
import 'three';
import '../../cache/types.cjs';

type RealisticPostProcessingConfig = {
    enabled?: boolean | undefined;
    bloom?: {
        intensity?: number | undefined;
        luminanceThreshold?: number | undefined;
    };
    dof?: {
        focusDistance?: number | undefined;
        focalLength?: number | undefined;
        bokehScale?: number | undefined;
    };
    vignette?: {
        offset?: number | undefined;
        darkness?: number | undefined;
    };
    noise?: {
        opacity?: number | undefined;
    };
    toneMappingExposure?: number | undefined;
};
declare class RealisticPostProcessingPlugin implements Plugin {
    readonly name = "RealisticPostProcessing";
    private composer;
    private bloom;
    private dof;
    private vignette;
    private noise;
    private config;
    constructor(config?: Partial<RealisticPostProcessingConfig>);
    install({ scene, camera, renderer }: PluginContext): void;
    postRender(): void;
    resize(width: number, height: number): void;
    update(newConfig: Partial<RealisticPostProcessingConfig>): void;
    dispose(): void;
}

export { type RealisticPostProcessingConfig, RealisticPostProcessingPlugin };
