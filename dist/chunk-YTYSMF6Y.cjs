"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk5C4PNMUPcjs = require('./chunk-5C4PNMUP.cjs');

// src/react/components/HDRI.tsx
var _react = require('react');
var HDRI = ({ entry }) => {
  const orchestrator = _chunk5C4PNMUPcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    orchestrator.setHDRI(entry);
  }, [entry.id]);
  return null;
};



exports.HDRI = HDRI;
