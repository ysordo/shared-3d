"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkKQB4KN3Rcjs = require('./chunk-KQB4KN3R.cjs');


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
  _chunkKQB4KN3Rcjs.usePlugin.call(void 0, () => new (0, _chunk2LFFYOLBcjs.AutoLODSystemPlugin)(config), enabled ? [config] : []);
  if (!enabled) {
    return null;
  }
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
