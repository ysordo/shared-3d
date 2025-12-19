import {
  usePlugin
} from "./chunk-IF5HNNFI.js";
import {
  AdvancedCameraCollisionPlugin
} from "./chunk-7UK5WDJQ.js";
import {
  useActiveModel
} from "./chunk-FSU35KMZ.js";

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
  const deps = useMemo(
    () => [...config, model, enabled],
    [...config, model, enabled]
  );
  usePlugin(
    "AdvancedCameraCollision",
    () => new AdvancedCameraCollisionPlugin(...config),
    deps
  );
  return null;
};

export {
  AdvancedCameraCollision
};
