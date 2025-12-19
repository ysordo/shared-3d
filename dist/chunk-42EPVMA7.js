import {
  usePlugin
} from "./chunk-IF5HNNFI.js";
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
  const deps = useMemo(() => [...Object.values(config), enabled], [...Object.values(config), enabled]);
  usePlugin("LODSystem", () => new LODSystemPlugin(config), deps);
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  LODSystem
};
