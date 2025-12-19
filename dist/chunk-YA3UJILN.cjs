"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkDLJXBVOIcjs = require('./chunk-DLJXBVOI.cjs');


var _chunkMCYH2TBQcjs = require('./chunk-MCYH2TBQ.cjs');

// src/react/components/PostProcessing.tsx
var _react = require('react');
var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const deps = _react.useMemo.call(void 0, 
    () => [bloom.strength, bloom.radius, bloom.threshold, enabled],
    [bloom.strength, bloom.radius, bloom.threshold, enabled]
  );
  _chunkDLJXBVOIcjs.usePlugin.call(void 0, 
    new (0, _chunkMCYH2TBQcjs.PostProcessingPlugin)(bloom),
    deps
  );
  if (!enabled) {
    return null;
  }
  return null;
};



exports.PostProcessing = PostProcessing;
