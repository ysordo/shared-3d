import {
  AdvancedCameraCollisionPlugin
} from "./chunk-3EGJYHIY.js";
import {
  useScene
} from "./chunk-OVWVQSTO.js";

// src/react/components/AdvancedCameraCollision.tsx
import { useEffect } from "react";
var AdvancedCameraCollision = ({ distanceThreshold = 0.6, pushBackOffset = 0.1, enabled = true }) => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const plugin = new AdvancedCameraCollisionPlugin(
      distanceThreshold,
      pushBackOffset
    );
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [enabled, distanceThreshold, pushBackOffset]);
  return null;
};

export {
  AdvancedCameraCollision
};
