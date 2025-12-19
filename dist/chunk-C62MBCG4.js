import {
  useScene
} from "./chunk-PW6BA4LF.js";
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
  const orchestrator = useScene();
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    const url = PRESETS[name];
    if (!url) {
      console.warn(`EnvironmentPreset: "${name}" no encontrado`);
      return;
    }
    const loader = new EXRLoader();
    loader.setDataType(THREE.HalfFloatType);
    loader.load(url, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      orchestrator.scene.environment = texture;
      orchestrator.scene.background = texture;
      orchestrator.scene.backgroundBlurriness = blur;
      orchestrator.scene.environmentIntensity = intensity;
    });
    return () => {
      if (orchestrator.scene.environment) {
        orchestrator.scene.environment.dispose();
        orchestrator.scene.environment = null;
      }
      if (orchestrator.scene.background) {
        if (!(orchestrator.scene.background instanceof THREE.Color)) {
          orchestrator.scene.background.dispose();
        }
        orchestrator.scene.background = null;
      }
    };
  }, [orchestrator, name, intensity, blur]);
  return null;
};

export {
  EnvironmentPreset
};
