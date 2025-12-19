"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkNFCEFR2Qcjs = require('./chunk-NFCEFR2Q.cjs');


var _chunkSD2EEMFKcjs = require('./chunk-SD2EEMFK.cjs');

// src/react/components/OrbitControls.tsx
var _react = require('react');
var OrbitControls = () => {
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkSD2EEMFKcjs.OrbitControlsPlugin)(), []);
  _chunkNFCEFR2Qcjs.usePlugin.call(void 0, factory, [factory]);
  return null;
};



exports.OrbitControls = OrbitControls;
