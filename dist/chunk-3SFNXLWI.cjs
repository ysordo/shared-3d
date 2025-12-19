"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkV2ZXLSNXcjs = require('./chunk-V2ZXLSNX.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunkV2ZXLSNXcjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
