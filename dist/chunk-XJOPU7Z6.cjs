"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkLLUDUZX2cjs = require('./chunk-LLUDUZX2.cjs');


var _chunkLW56STZBcjs = require('./chunk-LW56STZB.cjs');

// src/react/components/AutoLODSystem.tsx
var _react = require('react');
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  reductionPercentages
}) => {
  const config = _react.useMemo.call(void 0, 
    () => ({
      distances: [mediumDistance, lowDistance, hideDistance],
      reductionPercentages
    }),
    [mediumDistance, lowDistance, hideDistance, reductionPercentages]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkLW56STZBcjs.AutoLODSystemPlugin)(config), []);
  _chunkLLUDUZX2cjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
