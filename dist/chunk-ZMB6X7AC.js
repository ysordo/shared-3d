import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  PostProcessingPlugin
} from "./chunk-WSYMQLPW.js";

// src/react/components/PostProcessing.tsx
import { useCallback, useEffect } from "react";
var PostProcessing = ({
  strength = 1.5,
  radius = 0.4,
  threshold = 0,
  enabled = true
}) => {
  const factory = useCallback(
    () => new PostProcessingPlugin({
      enabled,
      bloom: { strength, radius, threshold }
    }),
    [enabled, strength, radius, threshold]
  );
  const plugin = usePlugin(factory, []);
  useEffect(() => {
    plugin?.update({ enabled, bloom: { strength, radius, threshold } });
  }, [enabled, strength, radius, threshold, plugin]);
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  PostProcessing
};
