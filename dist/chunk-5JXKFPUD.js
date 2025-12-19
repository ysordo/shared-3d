import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  AdvancedCameraCollisionPlugin
} from "./chunk-7UK5WDJQ.js";

// src/react/components/AdvancedCameraCollision.tsx
import { useCallback } from "react";
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const factory = useCallback(
    () => new AdvancedCameraCollisionPlugin(distanceThreshold, pushBackOffset, smooth),
    [distanceThreshold, pushBackOffset, smooth]
  );
  usePlugin(factory, enabled ? [distanceThreshold, pushBackOffset, smooth] : ["disabled"]);
  return null;
};

export {
  AdvancedCameraCollision
};
