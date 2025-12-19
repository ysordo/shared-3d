import {
  usePlugin
} from "./chunk-SCNUKH7N.js";
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
  usePlugin(() => new AutoLODSystemPlugin(config), enabled ? [config] : []);
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  AutoLODSystem
};
