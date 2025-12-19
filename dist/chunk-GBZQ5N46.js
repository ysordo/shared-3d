import {
  usePlugin
} from "./chunk-HSIROGI3.js";
import {
  AutoLODSystemPlugin
} from "./chunk-3VDQAJY7.js";

// src/react/components/AutoLODSystem.tsx
import { useMemo } from "react";
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  reductionPercentages,
  enabled = true
}) => {
  const deps = useMemo(
    () => [
      mediumDistance,
      lowDistance,
      hideDistance,
      reductionPercentages,
      enabled
    ],
    [mediumDistance, lowDistance, hideDistance, reductionPercentages, enabled]
  );
  usePlugin(
    new AutoLODSystemPlugin({
      distances: [mediumDistance, lowDistance, hideDistance],
      reductionPercentages
    }),
    deps
  );
  return null;
};

export {
  AutoLODSystem
};
