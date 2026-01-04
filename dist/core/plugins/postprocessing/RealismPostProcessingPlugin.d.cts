import { b as Plugin, P as PluginContext } from '../../../index-DE4jh8VF.cjs';
import '../../loaders/loaders.d.cjs';
import 'three';
import '../../cache/types.cjs';

type RealismPostProcessingConfig = {
    enabled?: boolean;
    ssgi?: {
        distance?: number;
        thickness?: number;
        denoiseIterations?: number;
        resolutionScale?: number;
    };
    hbao?: {
        intensity?: number;
        bias?: number;
    };
    traa?: {
        blend?: number;
    };
    motionBlur?: {
        intensity?: number;
    };
    toneMappingExposure?: number;
};
declare class RealismPostProcessingPlugin implements Plugin {
    readonly name = "RealismPostProcessing";
    private composer;
    private velocityPass;
    private ssgiEffect;
    private hbaoEffect;
    private traaEffect;
    private motionBlurEffect;
    private config;
    constructor(config?: Partial<RealismPostProcessingConfig>);
    install({ scene, camera, renderer }: PluginContext): void;
    postRender(): void;
    resize(width: number, height: number): void;
    update(newConfig: Partial<RealismPostProcessingConfig>): void;
    dispose(): void;
}

export { type RealismPostProcessingConfig, RealismPostProcessingPlugin };
