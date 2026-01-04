"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk7J7CBFY2cjs = require('./chunk-7J7CBFY2.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/light/PointLight.tsx
var _react = require('react');
var PointLight = ({
  intensity = 1,
  color = 16777215,
  position = [0, 5, 0],
  distance = 0,
  decay = 2
}) => {
  const { scene } = _chunk7J7CBFY2cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const light = new _chunkEA3XQ4KJcjs.THREE.PointLight(color, intensity, distance, decay);
    light.position.set(...position);
    scene.add(light);
    if (process.env.NODE_ENV === "development") {
      const helper = new _chunkEA3XQ4KJcjs.THREE.PointLightHelper(light, 0.5);
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



exports.PointLight = PointLight;
