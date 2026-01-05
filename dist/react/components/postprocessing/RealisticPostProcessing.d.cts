type RealisticPostProcessingProps = {
    enabled?: boolean;
    ssgiDistance?: number;
    ssgiThickness?: number;
    ssgiDenoiseIterations?: number;
    ssgiResolutionScale?: number;
    hbaoIntensity?: number;
    hbaoBias?: number;
    traaBlend?: number;
    motionBlurIntensity?: number;
    toneMappingExposure?: number;
};
/**
 * RealisticPostProcessing
 *
 * Componente declarativo para post-processing realista inspirado en Unreal Engine.
 * Incluye SSGI, HBAO, TRAA, Motion Blur.
 *
 * @example
 * <RealisticPostProcessing enabled={true} ssgiDistance={10} toneMappingExposure={1.0} />
 */
declare const RealisticPostProcessing: React.FC<RealisticPostProcessingProps>;

export { RealisticPostProcessing };
