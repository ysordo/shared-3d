import {
  useScene
} from "./chunk-PBNOVLKS.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/AmbientLight.tsx
import { useEffect } from "react";
var AmbientLight = ({
  intensity = 0.5,
  color = 16777215
}) => {
  const { scene } = useScene();
  useEffect(() => {
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
    return () => {
      scene.remove(light);
      light.dispose();
    };
  }, [intensity, color, scene]);
  return null;
};

export {
  AmbientLight
};
