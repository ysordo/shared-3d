"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkYKRGO7DBcjs = require('./chunk-YKRGO7DB.cjs');

// src/react/components/ModelPreload.tsx
var _react = require('react');
var ModelPreload = ({
  entries,
  draco = false,
  onProgress
}) => {
  _react.useEffect.call(void 0, () => {
    _chunkYKRGO7DBcjs.GLTFLoader.preload(entries, { draco }, onProgress);
  }, [entries, draco, onProgress]);
  return null;
};



exports.ModelPreload = ModelPreload;
