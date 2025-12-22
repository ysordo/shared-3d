"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk2W64Q5XJcjs = require('./chunk-2W64Q5XJ.cjs');


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
  _chunk2W64Q5XJcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
