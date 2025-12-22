"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkM5INMQVJcjs = require('./chunk-M5INMQVJ.cjs');


var _chunkIG4KQTIZcjs = require('./chunk-IG4KQTIZ.cjs');

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
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkIG4KQTIZcjs.AdvancedCameraCollisionPlugin)(), []);
  _chunkM5INMQVJcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
