"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk5BVZFCCPcjs = require('./chunk-5BVZFCCP.cjs');

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = _chunk5BVZFCCPcjs.useScene.call(void 0, );
  return orchestrator.getActiveModel();
};



exports.useActiveModel = useActiveModel;
