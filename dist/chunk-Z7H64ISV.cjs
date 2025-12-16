"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEYXI6UFEcjs = require('./chunk-EYXI6UFE.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/TheaterLighting.tsx
var _react = require('react');
var TheaterLighting = ({
  intensity = 2,
  count = 8
}) => {
  const { scene } = _chunkEYXI6UFEcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const lights = [];
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const light = new _chunkEA3XQ4KJcjs.THREE.PointLight(16777215, intensity);
      light.position.set(Math.cos(angle) * 5, 5, Math.sin(angle) * 5);
      scene.add(light);
      lights.push(light);
    }
    return () => {
      lights.forEach((l) => {
        scene.remove(l);
        l.dispose();
      });
    };
  }, [intensity, count]);
  return null;
};



exports.TheaterLighting = TheaterLighting;
