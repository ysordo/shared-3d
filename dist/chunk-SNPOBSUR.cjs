"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkR5KKB5JBcjs = require('./chunk-R5KKB5JB.cjs');


var _chunkSOZIZUM4cjs = require('./chunk-SOZIZUM4.cjs');

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
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkSOZIZUM4cjs.AutoLODSystemPlugin)(config), []);
  _chunkR5KKB5JBcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
