"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkRLPJUVA4cjs = require('./chunk-RLPJUVA4.cjs');


var _chunkYGYYGE5Acjs = require('./chunk-YGYYGE5A.cjs');

// src/react/components/PostProcessing.tsx
var _react = require('react');
var PostProcessing = ({
  strength = 1.5,
  radius = 0.4,
  threshold = 0,
  enabled = true
}) => {
  const config = _react.useMemo.call(void 0, 
    () => ({
      enabled,
      bloom: { strength, radius, threshold }
    }),
    [enabled, strength, radius, threshold]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkYGYYGE5Acjs.PostProcessingPlugin)(), []);
  _chunkRLPJUVA4cjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.PostProcessing = PostProcessing;
