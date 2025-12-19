import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  AutoLODSystemPlugin
} from "./chunk-3VDQAJY7.js";

// src/react/components/AutoLODSystem.tsx
import { useCallback } from "react";
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  reductionPercentages,
  enabled = true
}) => {
  const factory = useCallback(
    () => new AutoLODSystemPlugin({
      distances: [mediumDistance, lowDistance, hideDistance],
      reductionPercentages
    }),
    [mediumDistance, lowDistance, hideDistance, reductionPercentages]
  );
  usePlugin(factory, enabled ? [
    mediumDistance,
    lowDistance,
    hideDistance,
    reductionPercentages
  ] : ["disabled"]);
  return null;
};

export {
  AutoLODSystem
};
