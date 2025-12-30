"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkRLPJUVA4cjs = require('./chunk-RLPJUVA4.cjs');


var _chunkIMJQD3IFcjs = require('./chunk-IMJQD3IF.cjs');

// src/react/components/LODSystem.tsx
var _react = require('react');
var LODSystem = ({
  levels,
  hysteresis = 0.1,
  enabled = true
}) => {
  const config = _react.useMemo.call(void 0, 
    () => ({
      levels,
      hysteresis,
      enabled
    }),
    [levels, hysteresis, enabled]
  );
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkIMJQD3IFcjs.LODSystemPlugin)({ levels: [], hysteresis: 0 }),
    []
  );
  _chunkRLPJUVA4cjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.LODSystem = LODSystem;
