import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  PostProcessingPlugin
} from "./chunk-WSYMQLPW.js";

// src/react/components/PostProcessing.tsx
import { useCallback, useEffect } from "react";
var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const factory = useCallback(
    () => new PostProcessingPlugin({ enabled, bloom }),
    [enabled, bloom]
  );
  const plugin = usePlugin(factory, []);
  useEffect(() => {
    plugin?.update({ enabled, bloom });
  }, [enabled, bloom, plugin]);
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  PostProcessing
};
