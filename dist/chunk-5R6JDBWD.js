import {
  usePlugin
} from "./chunk-BDCH4C4X.js";
import {
  LODSystemPlugin
} from "./chunk-HVXJUMVE.js";

// src/react/components/LODSystem.tsx
import { useCallback } from "react";
var LODSystem = ({
  levels,
  hysteresis = 0.1,
  enabled = true
}) => {
  const factory = useCallback(
    () => new LODSystemPlugin([{ levels, hysteresis }]),
    [levels, hysteresis, enabled]
  );
  usePlugin(factory, [factory]);
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  LODSystem
};
