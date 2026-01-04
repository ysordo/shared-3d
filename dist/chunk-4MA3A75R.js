import {
  usePlugin
} from "./chunk-VGY2SOT6.js";
import {
  CinematicPostProcessingPlugin
} from "./chunk-2PCISXWO.js";

// src/react/components/postprocessing/CinematicPostProcessing.tsx
import { useCallback, useMemo } from "react";
var CinematicPostProcessing = ({
  enabled = true,
  toneMappingExposure = 1,
  vignetteDarkness = 1.2,
  vignetteOffset = 1.6,
  filmGrainIntensity = 0.05,
  antiAlias = true
}) => {
  const config = useMemo(
    () => ({
      enabled,
      toneMappingExposure,
      vignette: {
        darkness: vignetteDarkness,
        offset: vignetteOffset
      },
      filmGrain: {
        intensity: filmGrainIntensity
      },
      antiAlias
    }),
    [
      enabled,
      toneMappingExposure,
      vignetteDarkness,
      vignetteOffset,
      filmGrainIntensity,
      antiAlias
    ]
  );
  const factory = useCallback(() => new CinematicPostProcessingPlugin(), []);
  usePlugin(factory, config);
  return null;
};

export {
  CinematicPostProcessing
};
