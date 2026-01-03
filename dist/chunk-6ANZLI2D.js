import {
  useScene
} from "./chunk-NHJD6U4Z.js";
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
  const { scene } = useScene();
  useEffect(() => {
    const light = new THREE.PointLight(color, intensity, distance, decay);
    light.position.set(...position);
    scene.add(light);
    if (process.env.NODE_ENV === "development") {
      const helper = new THREE.PointLightHelper(light, 0.5);
      scene.add(helper);
      return () => {
        scene.remove(light);
        scene.remove(helper);
        light.dispose();
      };
    }
    return () => {
      scene.remove(light);
      light.dispose();
    };
  }, [intensity, color, position, distance, decay, scene]);
  return null;
};

export {
  PointLight
};
