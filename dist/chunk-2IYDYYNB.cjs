"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkYCSYW7S3cjs = require('./chunk-YCSYW7S3.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const orchestrator = _chunkYCSYW7S3cjs.useSceneContext.call(void 0, );
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
