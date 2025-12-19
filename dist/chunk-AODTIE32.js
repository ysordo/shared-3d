import {
  usePlugin
} from "./chunk-OSH6QSFA.js";
import {
  PostProcessingPlugin
} from "./chunk-SRDOYMT5.js";

// src/react/components/PostProcessing.tsx
import { useMemo } from "react";
var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const options = useMemo(
    () => bloom,
    [bloom.strength, bloom.radius, bloom.threshold]
  );
  usePlugin(
    () => new PostProcessingPlugin(options),
    enabled ? [options] : []
  );
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  PostProcessing
};
