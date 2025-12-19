"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkQQEAL6E5cjs = require('./chunk-QQEAL6E5.cjs');


var _chunkMMMO3SNVcjs = require('./chunk-MMMO3SNV.cjs');


var _chunkBS6FGAC2cjs = require('./chunk-BS6FGAC2.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const model = _chunkBS6FGAC2cjs.useActiveModel.call(void 0, );
  const factory = _react.useMemo.call(void 0, 
    () => new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(
      distanceThreshold,
      pushBackOffset,
      smooth
    ),
    [distanceThreshold, pushBackOffset, smooth, model, enabled]
  );
  _chunkQQEAL6E5cjs.usePlugin.call(void 0, factory, [factory]);
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
