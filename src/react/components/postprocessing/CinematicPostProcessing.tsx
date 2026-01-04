'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { CinematicPostProcessingPlugin } from '../../../core/plugins/postprocessing/CinematicPostProcessingPlugin';

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
export const CinematicPostProcessing: React.FC<
  CinematicPostProcessingProps
> = ({
  enabled = true,
  toneMappingExposure = 1.0,
  vignetteDarkness = 1.2,
  vignetteOffset = 1.6,
  filmGrainIntensity = 0.05,
  antiAlias = true,
}) => {
  const config = useMemo(
    () => ({
      enabled,
      toneMappingExposure,
      vignette: {
        darkness: vignetteDarkness,
        offset: vignetteOffset,
      },
      filmGrain: {
        intensity: filmGrainIntensity,
      },
      antiAlias,
    }),
    [
      enabled,
      toneMappingExposure,
      vignetteDarkness,
      vignetteOffset,
      filmGrainIntensity,
      antiAlias,
    ]
  );

  const factory = useCallback(() => new CinematicPostProcessingPlugin(), []);

  usePlugin(factory, config);

  return null;
};
