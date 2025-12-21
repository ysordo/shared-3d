import {
  usePlugin
} from "./chunk-I3ICZD4F.js";
import {
  PostProcessingPlugin
} from "./chunk-6KG4HOKU.js";

// src/react/components/PostProcessing.tsx
import { useCallback, useMemo } from "react";
var PostProcessing = ({
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
  const factory = useCallback(() => new PostProcessingPlugin(), []);
  usePlugin(factory, config);
  return null;
};

export {
  PostProcessing
};
