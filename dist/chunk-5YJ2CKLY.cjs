"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkV4HGR2GCcjs = require('./chunk-V4HGR2GC.cjs');


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
  const orchestrator = _chunkV4HGR2GCcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
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
    orchestrator.scene.add(light);
    if (target) {
      if (typeof target === "string") {
        const obj = orchestrator.scene.getObjectByName(target);
        if (obj) {
          light.target = obj;
        }
      } else {
        light.target = target;
        orchestrator.scene.add(target);
      }
    }
    if (process.env.NODE_ENV === "development") {
      const helper = new _chunkEA3XQ4KJcjs.THREE.SpotLightHelper(light);
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
  }, [
    orchestrator,
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
