"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkW4PDMXIPcjs = require('./chunk-W4PDMXIP.cjs');

// src/react/components/HDRI.tsx
var _react = require('react');
var HDRI = ({ entry }) => {
  const orchestrator = _chunkW4PDMXIPcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    orchestrator.setHDRI(entry);
  }, [entry.id]);
  return null;
};



exports.HDRI = HDRI;
