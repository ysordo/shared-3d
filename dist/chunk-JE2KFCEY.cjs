"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk2LYQYXCGcjs = require('./chunk-2LYQYXCG.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunk2LYQYXCGcjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
