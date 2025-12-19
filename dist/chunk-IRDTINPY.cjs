"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkISHYF53Icjs = require('./chunk-ISHYF53I.cjs');


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
  _chunkISHYF53Icjs.usePlugin.call(void 0, 
    new (0, _chunk2LFFYOLBcjs.AutoLODSystemPlugin)({
      distances: [mediumDistance, lowDistance, hideDistance],
      reductionPercentages
    }),
    deps
  );
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
