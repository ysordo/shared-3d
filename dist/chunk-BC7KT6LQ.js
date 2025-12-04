import {
  OrbitControlsPlugin
} from "./chunk-R4RSFB4I.js";
import {
  useScene
} from "./chunk-MAMG6W2Y.js";

// src/react/components/OrbitControls.tsx
import { useEffect } from "react";
var OrbitControls = () => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    orchestrator.use(new OrbitControlsPlugin());
  }, [orchestrator]);
  return null;
};

export {
  OrbitControls
};
