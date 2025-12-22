"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkZKG3D4LTcjs = require('./chunk-ZKG3D4LT.cjs');


var _chunkC4ITTLVVcjs = require('./chunk-C4ITTLVV.cjs');

// src/react/components/OrbitControls.tsx
var OrbitControls = () => {
  const config = {};
  const factory = () => new (0, _chunkC4ITTLVVcjs.OrbitControlsPlugin)();
  _chunkZKG3D4LTcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.OrbitControls = OrbitControls;
