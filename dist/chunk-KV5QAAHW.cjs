"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkBIYKJSVScjs = require('./chunk-BIYKJSVS.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/SpotLight.tsx
var _react = require('react');
var SpotLight = ({
  intensity = 5,
  color = 16777215,
  position = [0, 10, 0],
  target,
  angle = Math.PI / 6,
  penumbra = 0.1,
  distance = 50,
  castShadow = true
}) => {
  const { scene } = _chunkBIYKJSVScjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const light = new _chunkEA3XQ4KJcjs.THREE.SpotLight(
      color,
      intensity,
      distance,
      angle,
      penumbra
    );
    light.position.set(...position);
    light.castShadow = castShadow;
    if (castShadow) {
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
    }
    scene.add(light);
    if (target) {
      if (typeof target === "string") {
        const obj = scene.getObjectByName(target);
        if (obj) {
          light.target = obj;
        }
      } else {
        light.target = target;
        scene.add(target);
      }
    }
    if (process.env.NODE_ENV === "development") {
      const helper = new _chunkEA3XQ4KJcjs.THREE.SpotLightHelper(light);
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
  }, [
    intensity,
    color,
    position,
    target,
    angle,
    penumbra,
    distance,
    castShadow
  ]);
  return null;
};



exports.SpotLight = SpotLight;
