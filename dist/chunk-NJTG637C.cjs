"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkAAHJLMZRcjs = require('./chunk-AAHJLMZR.cjs');

// src/react/components/ModelPreload.tsx
var _react = require('react');
var ModelPreload = ({
  entries,
  draco = false
}) => {
  _react.useEffect.call(void 0, () => {
    entries.forEach((entry) => {
      _chunkAAHJLMZRcjs.GLTFLoader.load(entry, { draco }).catch(() => {
      });
    });
  }, [entries, draco]);
  return null;
};



exports.ModelPreload = ModelPreload;
