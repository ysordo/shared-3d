import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  AdvancedCameraCollisionPlugin
} from "./chunk-K33EMHLX.js";

// src/react/components/AdvancedCameraCollision.tsx
import { useCallback, useEffect } from "react";
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const factory = useCallback(
    () => new AdvancedCameraCollisionPlugin(
      distanceThreshold,
      pushBackOffset,
      smooth
    ),
    [distanceThreshold, pushBackOffset, smooth]
  );
  const plugin = usePlugin(
    factory,
    []
  );
  useEffect(() => {
    plugin?.update(distanceThreshold, pushBackOffset, smooth);
  }, [distanceThreshold, pushBackOffset, smooth, plugin]);
  return null;
};

export {
  AdvancedCameraCollision
};
