type UnrealEnginePostProcessingProps = {
    enabled?: boolean;
    bloomIntensity?: number;
    motionBlurIntensity?: number;
    taaBlend?: number;
    sharpenStrength?: number;
    toneMappingExposure?: number;
};
declare const UnrealEnginePostProcessing: React.FC<UnrealEnginePostProcessingProps>;

export { UnrealEnginePostProcessing };
