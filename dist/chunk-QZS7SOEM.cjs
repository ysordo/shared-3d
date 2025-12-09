"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkCNMTPCMIcjs = require('./chunk-CNMTPCMI.cjs');

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = _chunkCNMTPCMIcjs.useScene.call(void 0, );
  return orchestrator.getActiveModel();
};



exports.useActiveModel = useActiveModel;
