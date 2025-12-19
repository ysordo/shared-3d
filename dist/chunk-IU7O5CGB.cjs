"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkV34DH4C2cjs = require('./chunk-V34DH4C2.cjs');


var _chunkMMMO3SNVcjs = require('./chunk-MMMO3SNV.cjs');


var _chunkLHFRE7PQcjs = require('./chunk-LHFRE7PQ.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const model = _chunkLHFRE7PQcjs.useActiveModel.call(void 0, );
  const config = _react.useMemo.call(void 0, 
    () => [distanceThreshold, pushBackOffset, smooth],
    [distanceThreshold, pushBackOffset, smooth]
  );
  _chunkV34DH4C2cjs.usePlugin.call(void 0, 
    () => new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(...config),
    enabled && model ? config : []
  );
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
