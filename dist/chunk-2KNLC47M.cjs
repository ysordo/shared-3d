"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkM6PXJ3KScjs = require('./chunk-M6PXJ3KS.cjs');


var _chunkF6IFBPPEcjs = require('./chunk-F6IFBPPE.cjs');

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
    () => new (0, _chunkF6IFBPPEcjs.LODSystemPlugin)({ levels: [], hysteresis: 0 }),
    []
  );
  _chunkM6PXJ3KScjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.LODSystem = LODSystem;
