import {
  usePlugin
} from "./chunk-UHZBSJS6.js";
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
  usePlugin(new AutoLODSystemPlugin(config), deps);
  return null;
};

export {
  AutoLODSystem
};
