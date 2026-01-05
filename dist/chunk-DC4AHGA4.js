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
  bloomIntensity = 0.8,
  bloomLuminanceThreshold = 0.9,
  dofBokehScale = 2,
  dofFocusDistance = 0,
  dofFocalLength = 0.05,
  vignetteDarkness = 0.8,
  vignetteOffset = 0.5,
  noiseOpacity = 0.02,
  toneMappingExposure = 1
}) => {
  const config = useMemo(() => ({
    enabled,
    bloom: { intensity: bloomIntensity, luminanceThreshold: bloomLuminanceThreshold },
    dof: { bokehScale: dofBokehScale, focusDistance: dofFocusDistance, focalLength: dofFocalLength },
    vignette: { darkness: vignetteDarkness, offset: vignetteOffset },
    noise: { opacity: noiseOpacity },
    toneMappingExposure
  }), [enabled, bloomIntensity, bloomLuminanceThreshold, dofBokehScale, dofFocusDistance, dofFocalLength, vignetteDarkness, vignetteOffset, noiseOpacity, toneMappingExposure]);
  const factory = useCallback(() => new RealisticPostProcessingPlugin(), []);
  usePlugin(factory, config);
  return null;
};

export {
  RealisticPostProcessing
};
