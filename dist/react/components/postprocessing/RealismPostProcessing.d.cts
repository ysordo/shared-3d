type RealismPostProcessingProps = {
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
 * RealismPostProcessing
 *
 * Componente declarativo para post-processing realista inspirado en Unreal Engine.
 * Incluye SSGI, HBAO, TRAA, Motion Blur.
 *
 * @example
 * <RealismPostProcessing enabled={true} ssgiDistance={10} toneMappingExposure={1.0} />
 */
declare const RealismPostProcessing: React.FC<RealismPostProcessingProps>;

export { RealismPostProcessing };
