"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkPTT2KMPZcjs = require('./chunk-PTT2KMPZ.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunkPTT2KMPZcjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
