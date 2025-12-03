"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3UB2S2P3cjs = require('./chunk-3UB2S2P3.cjs');

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = _chunk3UB2S2P3cjs.useScene.call(void 0, );
  return orchestrator.getActiveModel();
};



exports.useActiveModel = useActiveModel;
