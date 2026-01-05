'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import type { UnrealEnginePostProcessingConfig } from '../../../core/plugins/postprocessing/UnrealEnginePostProcessingPlugin';
import { UnrealEnginePostProcessingPlugin } from '../../../core/plugins/postprocessing/UnrealEnginePostProcessingPlugin';

type UnrealEnginePostProcessingProps = {
  enabled?: boolean;
  bloomIntensity?: number;
  motionBlurIntensity?: number;
  taaBlend?: number;
  sharpenStrength?: number;
  toneMappingExposure?: number;
};

export const UnrealEnginePostProcessing: React.FC<
  UnrealEnginePostProcessingProps
> = ({
  enabled = true,
  bloomIntensity = 0.5,
  motionBlurIntensity = 0.4,
  taaBlend = 0.9,
  sharpenStrength = 0.2,
  toneMappingExposure = 1.1,
}) => {
  // Memoizamos la configuración para no recrearla en cada render
  const config: UnrealEnginePostProcessingConfig = useMemo(
    () => ({
      enabled,
      bloom: { intensity: bloomIntensity },
      motionBlur: { intensity: motionBlurIntensity },
      taa: { blend: taaBlend },
      sharpen: { strength: sharpenStrength },
      toneMappingExposure,
    }),
    [
      enabled,
      bloomIntensity,
      motionBlurIntensity,
      taaBlend,
      sharpenStrength,
      toneMappingExposure,
    ]
  );

  // Creamos el plugin una sola vez
  const factory = useCallback(() => new UnrealEnginePostProcessingPlugin(), []);

  // Hook que instala y actualiza el plugin con la config
  usePlugin(factory, config);

  return null;
};
