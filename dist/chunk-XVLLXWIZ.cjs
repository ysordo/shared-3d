"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkV34DH4C2cjs = require('./chunk-V34DH4C2.cjs');


var _chunk2LFFYOLBcjs = require('./chunk-2LFFYOLB.cjs');

// src/react/components/AutoLODSystem.tsx
var _react = require('react');
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  enabled = true
}) => {
  const config = _react.useMemo.call(void 0, 
    () => ({
      distances: [mediumDistance, lowDistance, hideDistance]
    }),
    [mediumDistance, lowDistance, hideDistance]
  );
  _chunkV34DH4C2cjs.usePlugin.call(void 0, () => new (0, _chunk2LFFYOLBcjs.AutoLODSystemPlugin)(config), enabled ? [config] : []);
  if (!enabled) {
    return null;
  }
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
