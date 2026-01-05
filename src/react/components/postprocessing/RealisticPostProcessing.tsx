'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { RealisticPostProcessingPlugin } from '../../../core/plugins/postprocessing/RealisticPostProcessingPlugin';

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
export const RealisticPostProcessing: React.FC<RealisticPostProcessingProps> = ({
  enabled = true,
  ssgiDistance = 10,
  ssgiThickness = 10,
  ssgiDenoiseIterations = 2,
  ssgiResolutionScale = 1,
  hbaoIntensity = 1,
  hbaoBias = 0.5,
  traaBlend = 0.8,
  motionBlurIntensity = 0.5,
  toneMappingExposure = 1.0,
}) => {
  const config = useMemo(
    () => ({
      enabled,
      ssgi: {
        distance: ssgiDistance,
        thickness: ssgiThickness,
        denoiseIterations: ssgiDenoiseIterations,
        resolutionScale: ssgiResolutionScale,
      },
      hbao: {
        intensity: hbaoIntensity,
        bias: hbaoBias,
      },
      traa: {
        blend: traaBlend,
      },
      motionBlur: {
        intensity: motionBlurIntensity,
      },
      toneMappingExposure,
    }),
    [
      enabled,
      ssgiDistance,
      ssgiThickness,
      ssgiDenoiseIterations,
      ssgiResolutionScale,
      hbaoIntensity,
      hbaoBias,
      traaBlend,
      motionBlurIntensity,
      toneMappingExposure,
    ]
  );

  const factory = useCallback(() => new RealisticPostProcessingPlugin(), []);

  usePlugin(factory, config);

  return null;
};
