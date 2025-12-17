"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEINTWW7Mcjs = require('./chunk-EINTWW7M.cjs');


var _chunkMMMO3SNVcjs = require('./chunk-MMMO3SNV.cjs');


var _chunk62PYNVDOcjs = require('./chunk-62PYNVDO.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const model = _chunk62PYNVDOcjs.useActiveModel.call(void 0, );
  const config = _react.useMemo.call(void 0, 
    () => [distanceThreshold, pushBackOffset, smooth],
    [distanceThreshold, pushBackOffset, smooth]
  );
  _chunkEINTWW7Mcjs.usePlugin.call(void 0, 
    () => new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(...config),
    enabled && model ? config : []
  );
  if (!enabled || !model) {
    return null;
  }
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
