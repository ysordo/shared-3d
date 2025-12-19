import {
  usePlugin
} from "./chunk-SCNUKH7N.js";
import {
  LODSystemPlugin
} from "./chunk-HVXJUMVE.js";

// src/react/components/LODSystem.tsx
import { useMemo } from "react";
var LODSystem = ({
  levels,
  hysteresis = 0.1,
  enabled = true
}) => {
  const config = useMemo(() => [{ levels, hysteresis }], [levels, hysteresis]);
  usePlugin(() => new LODSystemPlugin(config), enabled ? config : []);
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  LODSystem
};
