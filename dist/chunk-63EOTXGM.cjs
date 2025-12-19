"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkDAJHS4H5cjs = require('./chunk-DAJHS4H5.cjs');


var _chunkMCYH2TBQcjs = require('./chunk-MCYH2TBQ.cjs');

// src/react/components/PostProcessing.tsx
var _react = require('react');
var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const options = _react.useMemo.call(void 0, 
    () => bloom,
    [bloom.strength, bloom.radius, bloom.threshold]
  );
  _chunkDAJHS4H5cjs.usePlugin.call(void 0, 
    () => new (0, _chunkMCYH2TBQcjs.PostProcessingPlugin)(options),
    enabled ? [options] : []
  );
  if (!enabled) {
    return null;
  }
  return null;
};



exports.PostProcessing = PostProcessing;
