"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkE76QCBEIcjs = require('./chunk-E76QCBEI.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/TheaterLighting.tsx
var _react = require('react');
var TheaterLighting = ({
  intensity = 2,
  count = 8
}) => {
  const orchestrator = _chunkE76QCBEIcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    const lights = [];
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const light = new _chunkEA3XQ4KJcjs.THREE.PointLight(16777215, intensity);
      light.position.set(Math.cos(angle) * 5, 5, Math.sin(angle) * 5);
      orchestrator.scene.add(light);
      lights.push(light);
    }
    return () => {
      lights.forEach((l) => {
        orchestrator.scene.remove(l);
        l.dispose();
      });
    };
  }, [orchestrator, intensity, count]);
  return null;
};



exports.TheaterLighting = TheaterLighting;
