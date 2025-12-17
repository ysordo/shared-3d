import {
  usePlugin
} from "./chunk-PDPQSGLI.js";
import {
  AdvancedCameraCollisionPlugin
} from "./chunk-7UK5WDJQ.js";
import {
  useActiveModel
} from "./chunk-R4VRB436.js";

// src/react/components/AdvancedCameraCollision.tsx
import { useMemo } from "react";
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const model = useActiveModel();
  const config = useMemo(
    () => [distanceThreshold, pushBackOffset, smooth],
    [distanceThreshold, pushBackOffset, smooth]
  );
  usePlugin(
    () => new AdvancedCameraCollisionPlugin(...config),
    enabled && model ? config : []
  );
  if (!enabled || !model) {
    return null;
  }
  return null;
};

export {
  AdvancedCameraCollision
};
