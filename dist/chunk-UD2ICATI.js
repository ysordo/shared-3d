import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  AutoLODSystemPlugin
} from "./chunk-N7GCQ2IB.js";

// src/react/components/AutoLODSystem.tsx
import { useCallback, useEffect } from "react";
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  reductionPercentages
}) => {
  const factory = useCallback(
    () => new AutoLODSystemPlugin({
      distances: [mediumDistance, lowDistance, hideDistance],
      reductionPercentages
    }),
    [mediumDistance, lowDistance, hideDistance, reductionPercentages]
  );
  const plugin = usePlugin(factory, []);
  useEffect(() => {
    plugin?.update({
      distances: [mediumDistance, lowDistance, hideDistance],
      reductionPercentages
    });
  }, [mediumDistance, lowDistance, hideDistance, reductionPercentages, plugin]);
  return null;
};

export {
  AutoLODSystem
};
