"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkQEXPEXQRcjs = require('./chunk-QEXPEXQR.cjs');


var _chunkT2JEYSOHcjs = require('./chunk-T2JEYSOH.cjs');

// src/react/components/LODSystem.tsx
var _react = require('react');
var LODSystem = ({
  levels,
  hysteresis = 0.1,
  enabled = true
}) => {
  const config = _react.useMemo.call(void 0, () => [{ levels, hysteresis }], [levels, hysteresis]);
  _chunkQEXPEXQRcjs.usePlugin.call(void 0, () => new (0, _chunkT2JEYSOHcjs.LODSystemPlugin)(config), enabled ? config : []);
  if (!enabled) {
    return null;
  }
  return null;
};



exports.LODSystem = LODSystem;
