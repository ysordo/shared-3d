"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkISHYF53Icjs = require('./chunk-ISHYF53I.cjs');


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
  const deps = _react.useMemo.call(void 0, 
    () => [distanceThreshold, pushBackOffset, smooth, model, enabled],
    [distanceThreshold, pushBackOffset, smooth, model, enabled]
  );
  _chunkISHYF53Icjs.usePlugin.call(void 0, 
    new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(distanceThreshold, pushBackOffset, smooth),
    deps
  );
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
