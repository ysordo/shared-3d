"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEC2ZLY2Vcjs = require('./chunk-EC2ZLY2V.cjs');


var _chunkS23E3JRGcjs = require('./chunk-S23E3JRG.cjs');

// src/react/components/postprocessing/BloomPostProcessing.tsx
var _react = require('react');
var BloomPostProcessing = ({
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
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkS23E3JRGcjs.BloomPostProcessingPlugin)(), []);
  _chunkEC2ZLY2Vcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.BloomPostProcessing = BloomPostProcessing;
