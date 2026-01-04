'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { RealismPostProcessingPlugin } from '../../../core/plugins/postprocessing/RealismPostProcessingPlugin';

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
export const RealismPostProcessing: React.FC<RealismPostProcessingProps> = ({
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

  const factory = useCallback(() => new RealismPostProcessingPlugin(), []);

  usePlugin(factory, config);

  return null;
};
