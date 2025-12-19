"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunkT2JEYSOHcjs = require('./chunk-T2JEYSOH.cjs');

// src/react/components/LODSystem.tsx
var _react = require('react');
var LODSystem = ({
  levels,
  hysteresis = 0.1,
  enabled = true
}) => {
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkT2JEYSOHcjs.LODSystemPlugin)([{ levels, hysteresis }]),
    [levels, hysteresis]
  );
  _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, enabled ? [levels, hysteresis] : ["disabled"]);
  if (!enabled) {
    return null;
  }
  return null;
};



exports.LODSystem = LODSystem;
