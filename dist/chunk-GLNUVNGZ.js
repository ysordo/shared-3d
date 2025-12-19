import {
  useScene
} from "./chunk-TTAIYPI4.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/AmbientLight.tsx
import { useEffect } from "react";
var AmbientLight = ({
  intensity = 0.5,
  color = 16777215
}) => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    const light = new THREE.AmbientLight(color, intensity);
    orchestrator.scene.add(light);
    return () => {
      orchestrator.scene.remove(light);
      light.dispose();
    };
  }, [intensity, color, orchestrator]);
  return null;
};

export {
  AmbientLight
};
