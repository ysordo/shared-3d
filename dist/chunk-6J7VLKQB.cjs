"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkC7CPDDG7cjs = require('./chunk-C7CPDDG7.cjs');

// src/react/components/HDRI.tsx
var _react = require('react');
var HDRI = ({ entry }) => {
  const orchestrator = _chunkC7CPDDG7cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    orchestrator.setHDRI(entry);
  }, [entry.id]);
  return null;
};



exports.HDRI = HDRI;
