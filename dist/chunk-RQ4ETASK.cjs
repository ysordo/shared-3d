"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkBI5456PDcjs = require('./chunk-BI5456PD.cjs');


var _chunkB7F57ZYRcjs = require('./chunk-B7F57ZYR.cjs');

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
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkB7F57ZYRcjs.AdvancedCameraCollisionPlugin)(), []);
  _chunkBI5456PDcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
