import {
  OrbitControlsPlugin
} from "./chunk-R4RSFB4I.js";
import {
  useScene
} from "./chunk-VNFDJQDF.js";

// src/react/components/OrbitControls.tsx
import { useEffect } from "react";
var OrbitControls = () => {
  const orchestrator = useScene();
  useEffect(() => {
    orchestrator.use(new OrbitControlsPlugin());
  }, []);
  return null;
};

export {
  OrbitControls
};
