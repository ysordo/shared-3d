"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkNXMNULHBcjs = require('./chunk-NXMNULHB.cjs');

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = _chunkNXMNULHBcjs.useScene.call(void 0, );
  return orchestrator.getActiveModel();
};



exports.useActiveModel = useActiveModel;
