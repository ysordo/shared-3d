"use client";
import {
  CinematicPostProcessingPlugin
} from "../../chunk-RTN7ZJDY.js";
import {
  usePlugin
} from "../../chunk-VGY2SOT6.js";
import "../../chunk-PYBGN7YC.js";
import "../../chunk-NHJD6U4Z.js";
import "../../chunk-YS7SZK5L.js";
import "../../chunk-U6YB3DJH.js";
import "../../chunk-SRRBNWVQ.js";
import "../../chunk-OK2NCVM7.js";
import "../../chunk-OVHQQSEK.js";
import "../../chunk-RBZOTBBM.js";
import "../../chunk-7ZN6VXPX.js";
import "../../chunk-5QJW7WE3.js";

// src/react/components/CinematicPostProcessing.tsx
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
