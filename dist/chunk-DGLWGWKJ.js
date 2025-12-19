import {
  usePlugin
} from "./chunk-BKBNIEFK.js";
import {
  PostProcessingPlugin
} from "./chunk-SRDOYMT5.js";

// src/react/components/PostProcessing.tsx
import { useMemo } from "react";
var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const deps = useMemo(
    () => [bloom.strength, bloom.radius, bloom.threshold, enabled],
    [bloom.strength, bloom.radius, bloom.threshold, enabled]
  );
  usePlugin(
    new PostProcessingPlugin(bloom),
    deps
  );
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  PostProcessing
};
