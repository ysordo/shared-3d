"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkKH6H4E25cjs = require('./chunk-KH6H4E25.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/AmbientLight.tsx
var _react = require('react');
var AmbientLight = ({
  intensity = 0.5,
  color = 16777215
}) => {
  const orchestrator = _chunkKH6H4E25cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    const light = new _chunkEA3XQ4KJcjs.THREE.AmbientLight(color, intensity);
    orchestrator.scene.add(light);
    return () => {
      orchestrator.scene.remove(light);
      light.dispose();
    };
  }, [intensity, color, orchestrator]);
  return null;
};



exports.AmbientLight = AmbientLight;
