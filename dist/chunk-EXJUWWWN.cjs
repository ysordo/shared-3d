"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkOJGD2LZBcjs = require('./chunk-OJGD2LZB.cjs');


var _chunkKBMNLKQ6cjs = require('./chunk-KBMNLKQ6.cjs');

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
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkKBMNLKQ6cjs.AdvancedCameraCollisionPlugin)(), []);
  _chunkOJGD2LZBcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
