"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkNYB3ZW6Wcjs = require('./chunk-NYB3ZW6W.cjs');


var _chunkMMMO3SNVcjs = require('./chunk-MMMO3SNV.cjs');


var _chunkKNGNZKHEcjs = require('./chunk-KNGNZKHE.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const model = _chunkKNGNZKHEcjs.useActiveModel.call(void 0, );
  const config = _react.useMemo.call(void 0, 
    () => [distanceThreshold, pushBackOffset, smooth],
    [distanceThreshold, pushBackOffset, smooth]
  );
  _chunkNYB3ZW6Wcjs.usePlugin.call(void 0, 
    () => new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(...config),
    enabled && model ? config : []
  );
  if (!enabled || !model) {
    return null;
  }
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
