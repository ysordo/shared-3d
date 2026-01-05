import {
  usePlugin
} from "./chunk-VGY2SOT6.js";
import {
  UnrealEnginePostProcessingPlugin
} from "./chunk-E76VJI2V.js";

// src/react/components/postprocessing/UnrealEnginePostProcessing.tsx
import { useCallback, useMemo } from "react";
var UnrealEnginePostProcessing = ({
  enabled = true,
  bloomIntensity = 0.5,
  motionBlurIntensity = 0.4,
  taaBlend = 0.9,
  sharpenStrength = 0.2,
  toneMappingExposure = 1.1
}) => {
  const config = useMemo(
    () => ({
      enabled,
      bloom: { intensity: bloomIntensity },
      motionBlur: { intensity: motionBlurIntensity },
      taa: { blend: taaBlend },
      sharpen: { strength: sharpenStrength },
      toneMappingExposure
    }),
    [
      enabled,
      bloomIntensity,
      motionBlurIntensity,
      taaBlend,
      sharpenStrength,
      toneMappingExposure
    ]
  );
  const factory = useCallback(() => new UnrealEnginePostProcessingPlugin(), []);
  usePlugin(factory, config);
  return null;
};

export {
  UnrealEnginePostProcessing
};
