"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkK5365JNLcjs = require('./chunk-K5365JNL.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunkK5365JNLcjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
