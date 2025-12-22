"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk2W64Q5XJcjs = require('./chunk-2W64Q5XJ.cjs');


var _chunk7XTWFKZPcjs = require('./chunk-7XTWFKZP.cjs');

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
  const factory = _react.useCallback.call(void 0, () => new (0, _chunk7XTWFKZPcjs.PostProcessingPlugin)(), []);
  _chunk2W64Q5XJcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.PostProcessing = PostProcessing;
