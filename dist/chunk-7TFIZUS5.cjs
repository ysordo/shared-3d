"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkVYVXBOWMcjs = require('./chunk-VYVXBOWM.cjs');


var _chunkMMMO3SNVcjs = require('./chunk-MMMO3SNV.cjs');


var _chunkYYM2O3MBcjs = require('./chunk-YYM2O3MB.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const model = _chunkYYM2O3MBcjs.useActiveModel.call(void 0, );
  const config = _react.useMemo.call(void 0, 
    () => [distanceThreshold, pushBackOffset, smooth],
    [distanceThreshold, pushBackOffset, smooth]
  );
  _chunkVYVXBOWMcjs.usePlugin.call(void 0, 
    () => new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(...config),
    enabled && model ? config : []
  );
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
