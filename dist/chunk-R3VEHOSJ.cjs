"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkHMHIWIBXcjs = require('./chunk-HMHIWIBX.cjs');

// src/react/components/ModelPreload.tsx
var _react = require('react');
var ModelPreload = ({
  entries,
  draco = false,
  onProgress
}) => {
  _react.useEffect.call(void 0, () => {
    _chunkHMHIWIBXcjs.GLTFLoader.preload(entries, { draco }, onProgress);
  }, [entries, draco, onProgress]);
  return null;
};



exports.ModelPreload = ModelPreload;
