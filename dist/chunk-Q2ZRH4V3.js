import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  PostProcessingPlugin
} from "./chunk-SRDOYMT5.js";

// src/react/components/PostProcessing.tsx
import { useCallback } from "react";
var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const factory = useCallback(() => new PostProcessingPlugin(bloom), [bloom]);
  usePlugin(factory, enabled ? [bloom] : ["disabled"]);
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  PostProcessing
};
