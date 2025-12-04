"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk5BVZFCCPcjs = require('./chunk-5BVZFCCP.cjs');



var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/EnvironmentPreset.tsx
var _react = require('react');
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
  const orchestrator = _chunk5BVZFCCPcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const url = PRESETS[name];
    if (!url) {
      console.warn(`EnvironmentPreset: "${name}" no encontrado`);
      return;
    }
    const loader = new (0, _chunkEA3XQ4KJcjs.EXRLoader)();
    loader.setDataType(_chunkEA3XQ4KJcjs.THREE.HalfFloatType);
    loader.load(url, (texture) => {
      texture.mapping = _chunkEA3XQ4KJcjs.THREE.EquirectangularReflectionMapping;
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
        if (!(orchestrator.scene.background instanceof _chunkEA3XQ4KJcjs.THREE.Color)) {
          orchestrator.scene.background.dispose();
        }
        orchestrator.scene.background = null;
      }
    };
  }, [name, intensity, blur]);
  return null;
};



exports.EnvironmentPreset = EnvironmentPreset;
