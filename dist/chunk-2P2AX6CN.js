import {
  usePlugin
} from "./chunk-VGY2SOT6.js";
import {
  HighResPostProcessingPlugin
} from "./chunk-M6FH6YMZ.js";

// src/react/components/postprocessing/HighResPostProcessing.tsx
import { useCallback, useMemo } from "react";
var HighResPostProcessing = ({
  enabled = true,
  toneMappingExposure = 1,
  multisampling = 8,
  aaType = "smaa",
  superSampling = 1
}) => {
  const config = useMemo(
    () => ({
      enabled,
      toneMappingExposure,
      multisampling,
      aaType,
      superSampling
    }),
    [enabled, toneMappingExposure, multisampling, aaType, superSampling]
  );
  const factory = useCallback(() => new HighResPostProcessingPlugin(), []);
  usePlugin(factory, config);
  return null;
};

export {
  HighResPostProcessing
};
