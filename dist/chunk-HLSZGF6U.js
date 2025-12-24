import {
  usePlugin
} from "./chunk-CKCOWOEK.js";
import {
  AutoLODSystemPlugin
} from "./chunk-PYT2UBW2.js";

// src/react/components/AutoLODSystem.tsx
import { useCallback, useMemo } from "react";
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  reductionPercentages
}) => {
  const config = useMemo(
    () => ({
      distances: [mediumDistance, lowDistance, hideDistance],
      reductionPercentages
    }),
    [mediumDistance, lowDistance, hideDistance, reductionPercentages]
  );
  const factory = useCallback(() => new AutoLODSystemPlugin(config), []);
  usePlugin(factory, config);
  return null;
};

export {
  AutoLODSystem
};
