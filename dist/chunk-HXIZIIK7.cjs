"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkW4PDMXIPcjs = require('./chunk-W4PDMXIP.cjs');

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = _chunkW4PDMXIPcjs.useScene.call(void 0, );
  return orchestrator.getActiveModel();
};



exports.useActiveModel = useActiveModel;
