"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk4F6P3R7Rcjs = require('./chunk-4F6P3R7R.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/AmbientLight.tsx
var _react = require('react');
var AmbientLight = ({
  intensity = 0.5,
  color = 16777215
}) => {
  const { scene } = _chunk4F6P3R7Rcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const light = new _chunkEA3XQ4KJcjs.THREE.AmbientLight(color, intensity);
    scene.add(light);
    return () => {
      scene.remove(light);
      light.dispose();
    };
  }, [intensity, color]);
  return null;
};



exports.AmbientLight = AmbientLight;
