"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkFBZ762XYcjs = require('./chunk-FBZ762XY.cjs');


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
  const deps = _react.useMemo.call(void 0, 
    () => [
      mediumDistance,
      lowDistance,
      hideDistance,
      reductionPercentages,
      enabled
    ],
    [mediumDistance, lowDistance, hideDistance, reductionPercentages, enabled]
  );
  _chunkFBZ762XYcjs.usePlugin.call(void 0, 
    new (0, _chunk2LFFYOLBcjs.AutoLODSystemPlugin)({
      distances: [mediumDistance, lowDistance, hideDistance],
      reductionPercentages
    }),
    deps
  );
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
