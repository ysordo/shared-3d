"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEC2ZLY2Vcjs = require('./chunk-EC2ZLY2V.cjs');


var _chunkPAEIB24Jcjs = require('./chunk-PAEIB24J.cjs');

// src/react/components/postprocessing/UnrealEnginePostProcessing.tsx
var _react = require('react');
var UnrealEnginePostProcessing = () => {
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkPAEIB24Jcjs.UnrealEnginePostProcessingPlugin)(), []);
  _chunkEC2ZLY2Vcjs.usePlugin.call(void 0, factory, {});
  return null;
};



exports.UnrealEnginePostProcessing = UnrealEnginePostProcessing;
