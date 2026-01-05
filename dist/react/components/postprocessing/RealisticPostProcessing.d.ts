type RealisticPostProcessingProps = {
    enabled?: boolean;
    bloomIntensity?: number;
    bloomLuminanceThreshold?: number;
    dofBokehScale?: number;
    dofFocusDistance?: number;
    dofFocalLength?: number;
    vignetteDarkness?: number;
    vignetteOffset?: number;
    noiseOpacity?: number;
    toneMappingExposure?: number;
};
declare const RealisticPostProcessing: React.FC<RealisticPostProcessingProps>;

export { RealisticPostProcessing };
