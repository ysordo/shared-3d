import {
  usePlugin
} from "./chunk-M4U37VHK.js";
import {
  AdvancedCameraCollisionPlugin
} from "./chunk-HMWQD7BG.js";

// src/react/components/AdvancedCameraCollision.tsx
import { useCallback, useMemo } from "react";
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const config = useMemo(
    () => ({
      distanceThreshold,
      pushBackOffset,
      smooth,
      enabled
    }),
    [distanceThreshold, pushBackOffset, smooth, enabled]
  );
  const factory = useCallback(() => new AdvancedCameraCollisionPlugin(), []);
  usePlugin(factory, config);
  return null;
};

export {
  AdvancedCameraCollision
};
