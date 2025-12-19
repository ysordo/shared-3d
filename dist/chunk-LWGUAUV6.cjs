"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkFBZ762XYcjs = require('./chunk-FBZ762XY.cjs');


var _chunkMMMO3SNVcjs = require('./chunk-MMMO3SNV.cjs');


var _chunk2V6BPD4Xcjs = require('./chunk-2V6BPD4X.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const model = _chunk2V6BPD4Xcjs.useActiveModel.call(void 0, );
  const deps = _react.useMemo.call(void 0, 
    () => [distanceThreshold, pushBackOffset, smooth, model, enabled],
    [distanceThreshold, pushBackOffset, smooth, model, enabled]
  );
  _chunkFBZ762XYcjs.usePlugin.call(void 0, 
    new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(distanceThreshold, pushBackOffset, smooth),
    deps
  );
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
