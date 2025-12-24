"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkKFT7QPMLcjs = require('./chunk-KFT7QPML.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunkKFT7QPMLcjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
