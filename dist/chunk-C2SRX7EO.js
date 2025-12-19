import {
  usePlugin
} from "./chunk-BDCH4C4X.js";
import {
  AdvancedCameraCollisionPlugin
} from "./chunk-7UK5WDJQ.js";
import {
  useActiveModel
} from "./chunk-CBC77TWZ.js";

// src/react/components/AdvancedCameraCollision.tsx
import { useCallback } from "react";
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const model = useActiveModel();
  const factory = useCallback(
    () => new AdvancedCameraCollisionPlugin(
      distanceThreshold,
      pushBackOffset,
      smooth
    ),
    [distanceThreshold, pushBackOffset, smooth, model]
  );
  usePlugin(factory, [factory], enabled);
  return null;
};

export {
  AdvancedCameraCollision
};
