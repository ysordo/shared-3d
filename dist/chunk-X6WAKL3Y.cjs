"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk6NFS7VGRcjs = require('./chunk-6NFS7VGR.cjs');

// src/react/components/ModelPreload.tsx
var _react = require('react');
var ModelPreload = ({
  entries,
  draco = false,
  onProgress
}) => {
  _react.useEffect.call(void 0, () => {
    _chunk6NFS7VGRcjs.GLTFLoader.preload(entries, { draco }, onProgress);
  }, [entries, draco, onProgress]);
  return null;
};



exports.ModelPreload = ModelPreload;
