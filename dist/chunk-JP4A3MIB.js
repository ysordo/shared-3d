import {
  usePlugin
} from "./chunk-BDCH4C4X.js";
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
  usePlugin(factory, [factory], enabled);
  return null;
};

export {
  AutoLODSystem
};
