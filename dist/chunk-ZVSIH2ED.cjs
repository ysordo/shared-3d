"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkUA2EXMCPcjs = require('./chunk-UA2EXMCP.cjs');

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = _chunkUA2EXMCPcjs.useScene.call(void 0, );
  return orchestrator.getActiveModel();
};



exports.useActiveModel = useActiveModel;
