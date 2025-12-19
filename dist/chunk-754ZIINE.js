import {
  usePlugin
} from "./chunk-GXOLQXMV.js";
import {
  AdvancedCameraCollisionPlugin
} from "./chunk-7UK5WDJQ.js";
import {
  useActiveModel
} from "./chunk-HAJEGFZI.js";

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
  return null;
};

export {
  AdvancedCameraCollision
};
