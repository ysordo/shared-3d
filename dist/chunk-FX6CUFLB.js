import {
  usePlugin
} from "./chunk-BDCH4C4X.js";
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
  usePlugin(factory, [factory], enabled);
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  PostProcessing
};
