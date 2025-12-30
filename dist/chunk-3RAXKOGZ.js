import {
  usePlugin
} from "./chunk-JF442FAR.js";
import {
  LODSystemPlugin
} from "./chunk-APUYWADJ.js";

// src/react/components/LODSystem.tsx
import { useCallback, useMemo } from "react";
var LODSystem = ({
  levels,
  hysteresis = 0.1,
  enabled = true
}) => {
  const config = useMemo(
    () => ({
      levels,
      hysteresis,
      enabled
    }),
    [levels, hysteresis, enabled]
  );
  const factory = useCallback(
    () => new LODSystemPlugin({ levels: [], hysteresis: 0 }),
    []
  );
  usePlugin(factory, config);
  return null;
};

export {
  LODSystem
};
