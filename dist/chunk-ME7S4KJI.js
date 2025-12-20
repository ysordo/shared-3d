import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  LODSystemPlugin
} from "./chunk-SU72AELG.js";

// src/react/components/LODSystem.tsx
import { useCallback, useEffect } from "react";
var LODSystem = ({
  levels,
  hysteresis = 0.1,
  enabled = true
}) => {
  const factory = useCallback(
    () => new LODSystemPlugin({ levels, hysteresis }),
    [levels, hysteresis]
  );
  const plugin = usePlugin(
    factory,
    []
  );
  useEffect(() => {
    plugin?.update({ levels, hysteresis });
  }, [levels, hysteresis, plugin]);
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  LODSystem
};
