"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk4ELG7LDCcjs = require('./chunk-4ELG7LDC.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const orchestrator = _chunk4ELG7LDCcjs.useSceneContext.call(void 0, );
  if (!orchestrator) {
    return null;
  }
  if (false) {
    const arr = [];
    orchestrator.preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return orchestrator.preload;
};



exports.usePreload = usePreload;
