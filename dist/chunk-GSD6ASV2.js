import {
  useScene
} from "./chunk-KHCQXOKB.js";
import {
  AdvancedCameraCollisionPlugin
} from "./chunk-7UK5WDJQ.js";

// src/react/components/AdvancedCameraCollision.tsx
import { useEffect } from "react";
var AdvancedCameraCollision = ({ enabled = true, ...config }) => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!enabled || !orchestrator || !orchestrator.getActiveModel()) {
      return;
    }
    if (orchestrator.has("AdvancedCameraCollision")) {
      return;
    }
    orchestrator.use(
      new AdvancedCameraCollisionPlugin(...Object.values(config))
    );
    return () => {
      orchestrator.plugin("AdvancedCameraCollision").dispose?.();
      orchestrator.remove("AdvancedCameraCollision");
    };
  }, [config, orchestrator, orchestrator.getActiveModel()]);
  return null;
};

export {
  AdvancedCameraCollision
};
