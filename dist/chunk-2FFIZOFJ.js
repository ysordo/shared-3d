import {
  useScene
} from "./chunk-7FZA4DKO.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/PointLight.tsx
import { useEffect } from "react";
var PointLight = ({
  intensity = 1,
  color = 16777215,
  position = [0, 5, 0],
  distance = 0,
  decay = 2
}) => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    const light = new THREE.PointLight(color, intensity, distance, decay);
    light.position.set(...position);
    orchestrator.scene.add(light);
    if (process.env.NODE_ENV === "development") {
      const helper = new THREE.PointLightHelper(light, 0.5);
      orchestrator.scene.add(helper);
      return () => {
        orchestrator.scene.remove(light);
        orchestrator.scene.remove(helper);
        light.dispose();
      };
    }
    return () => {
      orchestrator.scene.remove(light);
      light.dispose();
    };
  }, [orchestrator, intensity, color, position, distance, decay]);
  return null;
};

export {
  PointLight
};
