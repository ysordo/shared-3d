import {
  usePlugin
} from "./chunk-VGY2SOT6.js";
import {
  BloomPostProcessingPlugin
} from "./chunk-TXXNOUZQ.js";

// src/react/components/postprocessing/BloomPostProcessing.tsx
import { useCallback, useMemo } from "react";
var BloomPostProcessing = ({
  strength = 1.5,
  radius = 0.4,
  threshold = 0,
  enabled = true
}) => {
  const config = useMemo(
    () => ({
      enabled,
      bloom: { strength, radius, threshold }
    }),
    [enabled, strength, radius, threshold]
  );
  const factory = useCallback(() => new BloomPostProcessingPlugin(), []);
  usePlugin(factory, config);
  return null;
};

export {
  BloomPostProcessing
};
