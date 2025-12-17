"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTQDZYRSUcjs = require('./chunk-TQDZYRSU.cjs');


var _chunkMMMO3SNVcjs = require('./chunk-MMMO3SNV.cjs');


var _chunk2IAU735Scjs = require('./chunk-2IAU735S.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const model = _chunk2IAU735Scjs.useActiveModel.call(void 0, );
  const config = _react.useMemo.call(void 0, 
    () => [distanceThreshold, pushBackOffset, smooth],
    [distanceThreshold, pushBackOffset, smooth]
  );
  _chunkTQDZYRSUcjs.usePlugin.call(void 0, 
    () => new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(...config),
    enabled && model ? config : []
  );
  if (!enabled || !model) {
    return null;
  }
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
