"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkRLPJUVA4cjs = require('./chunk-RLPJUVA4.cjs');


var _chunkA3KJDD72cjs = require('./chunk-A3KJDD72.cjs');

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
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkA3KJDD72cjs.AutoLODSystemPlugin)(config), []);
  _chunkRLPJUVA4cjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
