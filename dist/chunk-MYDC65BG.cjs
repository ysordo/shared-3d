"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3M257MS7cjs = require('./chunk-3M257MS7.cjs');


var _chunkT2JEYSOHcjs = require('./chunk-T2JEYSOH.cjs');

// src/react/components/LODSystem.tsx
var _react = require('react');
var LODSystem = ({
  levels,
  hysteresis = 0.1,
  enabled = true
}) => {
  const config = _react.useMemo.call(void 0, () => [{ levels, hysteresis }], [levels, hysteresis]);
  const deps = _react.useMemo.call(void 0, () => [...Object.values(config), enabled], [...Object.values(config), enabled]);
  _chunk3M257MS7cjs.usePlugin.call(void 0, new (0, _chunkT2JEYSOHcjs.LODSystemPlugin)(config), deps);
  if (!enabled) {
    return null;
  }
  return null;
};



exports.LODSystem = LODSystem;
