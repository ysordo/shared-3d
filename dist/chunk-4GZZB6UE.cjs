"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTOIGUY7Scjs = require('./chunk-TOIGUY7S.cjs');


var _chunk3UB2S2P3cjs = require('./chunk-3UB2S2P3.cjs');

// src/react/components/OrbitControls.tsx
var _react = require('react');
var OrbitControls = () => {
  const orchestrator = _chunk3UB2S2P3cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    orchestrator.use(new (0, _chunkTOIGUY7Scjs.OrbitControlsPlugin)());
  }, []);
  return null;
};



exports.OrbitControls = OrbitControls;
