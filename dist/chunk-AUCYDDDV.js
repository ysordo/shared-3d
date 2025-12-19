import {
  usePlugin
} from "./chunk-IF5HNNFI.js";
import {
  AutoLODSystemPlugin
} from "./chunk-3VDQAJY7.js";

// src/react/components/AutoLODSystem.tsx
import { useMemo } from "react";
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  enabled = true
}) => {
  const config = useMemo(
    () => ({
      distances: [mediumDistance, lowDistance, hideDistance]
    }),
    [mediumDistance, lowDistance, hideDistance]
  );
  const deps = useMemo(
    () => [...Object.values(config), enabled],
    [...Object.values(config), enabled]
  );
  usePlugin("AutoLODSystem", () => new AutoLODSystemPlugin(config), deps);
  return null;
};

export {
  AutoLODSystem
};
