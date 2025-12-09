"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkC7CPDDG7cjs = require('./chunk-C7CPDDG7.cjs');

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = _chunkC7CPDDG7cjs.useScene.call(void 0, );
  return orchestrator.getActiveModel();
};



exports.useActiveModel = useActiveModel;
