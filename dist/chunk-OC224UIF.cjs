"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkDAZUNGPAcjs = require('./chunk-DAZUNGPA.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunkDAZUNGPAcjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
