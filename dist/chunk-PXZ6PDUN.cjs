"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkXIHNCTNTcjs = require('./chunk-XIHNCTNT.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/PointLight.tsx
var _react = require('react');
var PointLight = ({
  intensity = 1,
  color = 16777215,
  position = [0, 5, 0],
  distance = 0,
  decay = 2
}) => {
  const orchestrator = _chunkXIHNCTNTcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    const light = new _chunkEA3XQ4KJcjs.THREE.PointLight(color, intensity, distance, decay);
    light.position.set(...position);
    orchestrator.scene.add(light);
    if (process.env.NODE_ENV === "development") {
      const helper = new _chunkEA3XQ4KJcjs.THREE.PointLightHelper(light, 0.5);
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



exports.PointLight = PointLight;
