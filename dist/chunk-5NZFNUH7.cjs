"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkNFCEFR2Qcjs = require('./chunk-NFCEFR2Q.cjs');


var _chunk2LFFYOLBcjs = require('./chunk-2LFFYOLB.cjs');

// src/react/components/AutoLODSystem.tsx
var _react = require('react');
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  reductionPercentages,
  enabled = true
}) => {
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunk2LFFYOLBcjs.AutoLODSystemPlugin)({
      distances: [mediumDistance, lowDistance, hideDistance],
      reductionPercentages
    }),
    [mediumDistance, lowDistance, hideDistance, reductionPercentages]
  );
  _chunkNFCEFR2Qcjs.usePlugin.call(void 0, factory, [factory], enabled);
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
