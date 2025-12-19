import {
  useScene
} from "./chunk-BYTQQZPW.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/TheaterLighting.tsx
import { useEffect } from "react";
var TheaterLighting = ({
  intensity = 2,
  count = 8
}) => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    const lights = [];
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const light = new THREE.PointLight(16777215, intensity);
      light.position.set(Math.cos(angle) * 5, 5, Math.sin(angle) * 5);
      orchestrator.scene.add(light);
      lights.push(light);
    }
    return () => {
      lights.forEach((l) => {
        orchestrator.scene.remove(l);
        l.dispose();
      });
    };
  }, [orchestrator, intensity, count]);
  return null;
};

export {
  TheaterLighting
};
