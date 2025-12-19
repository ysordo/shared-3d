"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunkMMMO3SNVcjs = require('./chunk-MMMO3SNV.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(distanceThreshold, pushBackOffset, smooth),
    [distanceThreshold, pushBackOffset, smooth]
  );
  _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, enabled ? [distanceThreshold, pushBackOffset, smooth] : ["disabled"]);
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
