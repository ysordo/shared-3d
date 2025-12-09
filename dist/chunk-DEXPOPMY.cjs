"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk5C4PNMUPcjs = require('./chunk-5C4PNMUP.cjs');

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = _chunk5C4PNMUPcjs.useScene.call(void 0, );
  return orchestrator.getActiveModel();
};



exports.useActiveModel = useActiveModel;
