"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkR5KKB5JBcjs = require('./chunk-R5KKB5JB.cjs');


var _chunkFQPWKXLXcjs = require('./chunk-FQPWKXLX.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const config = _react.useMemo.call(void 0, 
    () => ({
      distanceThreshold,
      pushBackOffset,
      smooth,
      enabled
    }),
    [distanceThreshold, pushBackOffset, smooth, enabled]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkFQPWKXLXcjs.AdvancedCameraCollisionPlugin)(), []);
  _chunkR5KKB5JBcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
