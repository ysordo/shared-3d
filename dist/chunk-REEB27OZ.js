import {
  usePlugin
} from "./chunk-HSIROGI3.js";
import {
  AdvancedCameraCollisionPlugin
} from "./chunk-7UK5WDJQ.js";
import {
  useActiveModel
} from "./chunk-CBC77TWZ.js";

// src/react/components/AdvancedCameraCollision.tsx
import { useMemo } from "react";
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const model = useActiveModel();
  const deps = useMemo(
    () => [distanceThreshold, pushBackOffset, smooth, model, enabled],
    [distanceThreshold, pushBackOffset, smooth, model, enabled]
  );
  usePlugin(
    new AdvancedCameraCollisionPlugin(distanceThreshold, pushBackOffset, smooth),
    deps
  );
  return null;
};

export {
  AdvancedCameraCollision
};
