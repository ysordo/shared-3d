import {
  usePlugin
} from "./chunk-UHZBSJS6.js";
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
  const deps = useMemo(() => [levels, hysteresis, enabled], [levels, hysteresis, enabled]);
  usePlugin(new LODSystemPlugin([{ levels, hysteresis }]), deps);
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  LODSystem
};
