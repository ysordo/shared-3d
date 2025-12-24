import {
  useScene
} from "./chunk-VV62LZ2Q.js";
import {
  EXRLoader,
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/EnvironmentPreset.tsx
import { useEffect } from "react";
var PRESETS = {
  studio: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/studio.exr",
  sunset: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/sunset.exr",
  dawn: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/dawn.exr",
  night: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/night.exr",
  warehouse: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/warehouse.exr",
  forest: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/forest.exr",
  apartment: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/apartment.exr",
  city: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/city.exr",
  park: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/park.exr",
  lobby: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/lobby.exr"
};
var EnvironmentPreset = ({
  name,
  intensity = 1,
  blur = 0
}) => {
  const { scene } = useScene();
  useEffect(() => {
    const url = PRESETS[name];
    if (!url) {
      console.warn(`EnvironmentPreset: "${name}" no encontrado`);
      return;
    }
    const loader = new EXRLoader();
    loader.setDataType(THREE.HalfFloatType);
    loader.load(url, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.background = texture;
      scene.backgroundBlurriness = blur;
      scene.environmentIntensity = intensity;
    });
    return () => {
      if (scene.environment) {
        scene.environment.dispose();
        scene.environment = null;
      }
      if (scene.background) {
        if (!(scene.background instanceof THREE.Color)) {
          scene.background.dispose();
        }
        scene.background = null;
      }
    };
  }, [name, intensity, blur, scene]);
  return null;
};

export {
  EnvironmentPreset
};
