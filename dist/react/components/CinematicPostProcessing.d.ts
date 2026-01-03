type CinematicPostProcessingProps = {
    enabled?: boolean;
    toneMappingExposure?: number;
    vignetteDarkness?: number;
    vignetteOffset?: number;
    filmGrainIntensity?: number;
    antiAlias?: boolean;
};
/**
 * CinematicPostProcessing
 *
 * Declarative component to apply a realistic cinematic look:
 * -ACES Filmic Tone Mapping
 * -Subtle vignette
 * -Animated film grain
 * -SMAA anti-aliasing (optional)
 *
 * Fully reactive: change any prop and the effect is updated hot without recreating the composer.
 *
 * @example
 * <CinematicPostProcessing
 *   enabled={true}
 *   toneMappingExposure={1.2}
 *   vignetteDarkness={1.0}
 *   filmGrainIntensity={0.04}
 * />
 */
declare const CinematicPostProcessing: React.FC<CinematicPostProcessingProps>;

export { CinematicPostProcessing };
