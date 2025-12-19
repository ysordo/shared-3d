"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkYEMEWB4Pcjs = require('./chunk-YEMEWB4P.cjs');


var _chunkMMMO3SNVcjs = require('./chunk-MMMO3SNV.cjs');


var _chunkZPQPNNFRcjs = require('./chunk-ZPQPNNFR.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const model = _chunkZPQPNNFRcjs.useActiveModel.call(void 0, );
  const config = _react.useMemo.call(void 0, 
    () => [distanceThreshold, pushBackOffset, smooth],
    [distanceThreshold, pushBackOffset, smooth]
  );
  _chunkYEMEWB4Pcjs.usePlugin.call(void 0, 
    () => new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(...config),
    enabled && model ? config : []
  );
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
