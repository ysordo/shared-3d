"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk4F6P3R7Rcjs = require('./chunk-4F6P3R7R.cjs');

// src/react/components/HDRI.tsx
var _react = require('react');
var HDRI = ({ entry }) => {
  const orchestrator = _chunk4F6P3R7Rcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    orchestrator.setHDRI(entry);
  }, [entry.id]);
  return null;
};



exports.HDRI = HDRI;
