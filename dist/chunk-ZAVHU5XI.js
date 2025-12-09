import {
  AdvancedCameraCollisionPlugin
} from "./chunk-F54EHX65.js";
import {
  useScene
} from "./chunk-KITXMCSG.js";

// src/react/components/AdvancedCameraCollision.tsx
import { useEffect } from "react";
var AdvancedCameraCollision = ({ distanceThreshold = 0.6, pushBackOffset = 0.1, enabled = true }) => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!enabled || !orchestrator) {
      return;
    }
    if (orchestrator.has("AdvancedCameraCollision")) {
      return;
    }
    orchestrator.use(new AdvancedCameraCollisionPlugin(
      distanceThreshold,
      pushBackOffset
    ));
    return () => {
      orchestrator.plugin("AdvancedCameraCollision").dispose?.();
    };
  }, [enabled, distanceThreshold, pushBackOffset, orchestrator]);
  return null;
};

export {
  AdvancedCameraCollision
};
