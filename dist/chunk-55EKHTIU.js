import {
  usePlugin
} from "./chunk-M4U37VHK.js";
import {
  AutoLODSystemPlugin
} from "./chunk-DYFEVAAB.js";

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
