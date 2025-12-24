import {
  useScene
} from "./chunk-VV62LZ2Q.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/TheaterLighting.tsx
import { useEffect } from "react";
var TheaterLighting = ({
  intensity = 2,
  count = 8
}) => {
  const { scene } = useScene();
  useEffect(() => {
    const lights = [];
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const light = new THREE.PointLight(16777215, intensity);
      light.position.set(Math.cos(angle) * 5, 5, Math.sin(angle) * 5);
      scene.add(light);
      lights.push(light);
    }
    return () => {
      lights.forEach((l) => {
        scene.remove(l);
        l.dispose();
      });
    };
  }, [intensity, count, scene]);
  return null;
};

export {
  TheaterLighting
};
