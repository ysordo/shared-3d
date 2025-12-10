"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkJE3CNDUJcjs = require('./chunk-JE3CNDUJ.cjs');

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = _chunkJE3CNDUJcjs.useScene.call(void 0, );
  return orchestrator.getActiveModel();
};



exports.useActiveModel = useActiveModel;
