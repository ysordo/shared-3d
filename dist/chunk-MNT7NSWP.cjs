"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkNFCEFR2Qcjs = require('./chunk-NFCEFR2Q.cjs');


var _chunkMCYH2TBQcjs = require('./chunk-MCYH2TBQ.cjs');

// src/react/components/PostProcessing.tsx
var _react = require('react');
var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkMCYH2TBQcjs.PostProcessingPlugin)(bloom), [bloom]);
  _chunkNFCEFR2Qcjs.usePlugin.call(void 0, factory, [factory], enabled);
  if (!enabled) {
    return null;
  }
  return null;
};



exports.PostProcessing = PostProcessing;
