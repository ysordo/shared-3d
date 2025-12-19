"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkNFCEFR2Qcjs = require('./chunk-NFCEFR2Q.cjs');


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
    [levels, hysteresis, enabled]
  );
  _chunkNFCEFR2Qcjs.usePlugin.call(void 0, factory, [factory]);
  if (!enabled) {
    return null;
  }
  return null;
};



exports.LODSystem = LODSystem;
