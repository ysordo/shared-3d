import {
  usePlugin
} from "./chunk-VGY2SOT6.js";
import {
  RealisticPostProcessingPlugin
} from "./chunk-NBZOFQPO.js";

// src/react/components/postprocessing/RealisticPostProcessing.tsx
import { useCallback, useMemo } from "react";
var RealisticPostProcessing = ({
  enabled = true,
  ssgiDistance = 10,
  ssgiThickness = 10,
  ssgiDenoiseIterations = 2,
  ssgiResolutionScale = 1,
  hbaoIntensity = 1,
  hbaoBias = 0.5,
  traaBlend = 0.8,
  motionBlurIntensity = 0.5,
  toneMappingExposure = 1
}) => {
  const config = useMemo(
    () => ({
      enabled,
      ssgi: {
        distance: ssgiDistance,
        thickness: ssgiThickness,
        denoiseIterations: ssgiDenoiseIterations,
        resolutionScale: ssgiResolutionScale
      },
      hbao: {
        intensity: hbaoIntensity,
        bias: hbaoBias
      },
      traa: {
        blend: traaBlend
      },
      motionBlur: {
        intensity: motionBlurIntensity
      },
      toneMappingExposure
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
      toneMappingExposure
    ]
  );
  const factory = useCallback(() => new RealisticPostProcessingPlugin(), []);
  usePlugin(factory, config);
  return null;
};

export {
  RealisticPostProcessing
};
