"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkT7DRT6XWcjs = require('./chunk-T7DRT6XW.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunkT7DRT6XWcjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
