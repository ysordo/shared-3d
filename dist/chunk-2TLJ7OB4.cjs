"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunkMCYH2TBQcjs = require('./chunk-MCYH2TBQ.cjs');

// src/react/components/PostProcessing.tsx
var _react = require('react');
var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkMCYH2TBQcjs.PostProcessingPlugin)(bloom), [bloom]);
  _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, enabled ? [bloom] : ["disabled"]);
  if (!enabled) {
    return null;
  }
  return null;
};



exports.PostProcessing = PostProcessing;
