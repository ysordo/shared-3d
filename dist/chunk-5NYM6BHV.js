import {
  useScene
} from "./chunk-R5SGHSIE.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/DirectionalLight.tsx
import { useEffect } from "react";
var DirectionalLight = ({
  intensity = 1,
  color = 16777215,
  position = [5, 10, 7.5],
  castShadow = true,
  shadowMapSize = 2048
}) => {
  const { scene } = useScene();
  useEffect(() => {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...position);
    if (castShadow) {
      light.castShadow = true;
      light.shadow.mapSize.width = shadowMapSize;
      light.shadow.mapSize.height = shadowMapSize;
      light.shadow.camera.near = 0.1;
      light.shadow.camera.far = 50;
      light.shadow.camera.left = -20;
      light.shadow.camera.right = 20;
      light.shadow.camera.top = 20;
      light.shadow.camera.bottom = -20;
      light.shadow.bias = -1e-4;
    }
    scene.add(light);
    if (process.env.NODE_ENV === "development") {
      const helper = new THREE.DirectionalLightHelper(light, 2);
      scene.add(helper);
      return () => {
        scene.remove(light);
        scene.remove(helper);
        light.dispose();
        helper.dispose();
      };
    }
    return () => {
      scene.remove(light);
      light.dispose();
    };
  }, [intensity, color, position, castShadow, shadowMapSize, scene]);
  return null;
};

export {
  DirectionalLight
};
