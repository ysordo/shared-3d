"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkXRNKCSHRcjs = require('./chunk-XRNKCSHR.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const orchestrator = _chunkXRNKCSHRcjs.useSceneContext.call(void 0, );
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
