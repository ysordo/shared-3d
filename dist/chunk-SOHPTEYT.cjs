"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkQQEAL6E5cjs = require('./chunk-QQEAL6E5.cjs');


var _chunkT2JEYSOHcjs = require('./chunk-T2JEYSOH.cjs');

// src/react/components/LODSystem.tsx
var _react = require('react');
var LODSystem = ({
  levels,
  hysteresis = 0.1,
  enabled = true
}) => {
  const deps = _react.useMemo.call(void 0, () => [levels, hysteresis, enabled], [levels, hysteresis, enabled]);
  _chunkQQEAL6E5cjs.usePlugin.call(void 0, new (0, _chunkT2JEYSOHcjs.LODSystemPlugin)([{ levels, hysteresis }]), deps);
  if (!enabled) {
    return null;
  }
  return null;
};



exports.LODSystem = LODSystem;
