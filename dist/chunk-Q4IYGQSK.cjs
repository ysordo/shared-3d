"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3M257MS7cjs = require('./chunk-3M257MS7.cjs');


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
  const deps = _react.useMemo.call(void 0, 
    () => [...Object.values(options), enabled],
    [...Object.values(options), enabled]
  );
  _chunk3M257MS7cjs.usePlugin.call(void 0, 
    new (0, _chunkMCYH2TBQcjs.PostProcessingPlugin)(options),
    deps
  );
  if (!enabled) {
    return null;
  }
  return null;
};



exports.PostProcessing = PostProcessing;
