"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkUNDM6YCUcjs = require('./chunk-UNDM6YCU.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunkUNDM6YCUcjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
