import {
  OrbitControlsPlugin
} from "./chunk-R4RSFB4I.js";
import {
  useScene
} from "./chunk-KITXMCSG.js";

// src/react/components/OrbitControls.tsx
import { useEffect } from "react";
var OrbitControls = () => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    if (orchestrator.has("OrbitControls")) {
      return;
    }
    orchestrator.use(new OrbitControlsPlugin());
    return () => {
      orchestrator.plugin("OrbitControls").dispose?.();
      orchestrator.remove("OrbitControls");
    };
  }, [orchestrator]);
  return null;
};

export {
  OrbitControls
};
