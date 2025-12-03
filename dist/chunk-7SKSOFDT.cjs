"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTOIGUY7Scjs = require('./chunk-TOIGUY7S.cjs');


var _chunkW4PDMXIPcjs = require('./chunk-W4PDMXIP.cjs');

// src/react/components/OrbitControls.tsx
var _react = require('react');
var OrbitControls = () => {
  const orchestrator = _chunkW4PDMXIPcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    orchestrator.use(new (0, _chunkTOIGUY7Scjs.OrbitControlsPlugin)());
  }, []);
  return null;
};



exports.OrbitControls = OrbitControls;
