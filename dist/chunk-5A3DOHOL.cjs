"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk4C4LEAFDcjs = require('./chunk-4C4LEAFD.cjs');

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = _chunk4C4LEAFDcjs.useScene.call(void 0, );
  return orchestrator.getActiveModel();
};



exports.useActiveModel = useActiveModel;
