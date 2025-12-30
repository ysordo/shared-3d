"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkR5KKB5JBcjs = require('./chunk-R5KKB5JB.cjs');


var _chunkGMXG2LVYcjs = require('./chunk-GMXG2LVY.cjs');

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
    () => new (0, _chunkGMXG2LVYcjs.LODSystemPlugin)({ levels: [], hysteresis: 0 }),
    []
  );
  _chunkR5KKB5JBcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.LODSystem = LODSystem;
