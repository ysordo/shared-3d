"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk4C4LEAFDcjs = require('./chunk-4C4LEAFD.cjs');

// src/react/components/HDRI.tsx
var _react = require('react');
var HDRI = ({ entry }) => {
  const orchestrator = _chunk4C4LEAFDcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    orchestrator.setHDRI(entry);
  }, [entry.id]);
  return null;
};



exports.HDRI = HDRI;
