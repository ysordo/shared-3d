"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk7F5MUH5Mcjs = require('./chunk-7F5MUH5M.cjs');


var _chunkMMMO3SNVcjs = require('./chunk-MMMO3SNV.cjs');


var _chunkGQCEYY5Pcjs = require('./chunk-GQCEYY5P.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const model = _chunkGQCEYY5Pcjs.useActiveModel.call(void 0, );
  const config = _react.useMemo.call(void 0, 
    () => [distanceThreshold, pushBackOffset, smooth],
    [distanceThreshold, pushBackOffset, smooth]
  );
  _chunk7F5MUH5Mcjs.usePlugin.call(void 0, 
    () => new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(...config),
    enabled && model ? config : []
  );
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
