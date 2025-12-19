"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkNFCEFR2Qcjs = require('./chunk-NFCEFR2Q.cjs');


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
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(
      distanceThreshold,
      pushBackOffset,
      smooth
    ),
    [distanceThreshold, pushBackOffset, smooth, model]
  );
  _chunkNFCEFR2Qcjs.usePlugin.call(void 0, factory, [factory], enabled);
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
