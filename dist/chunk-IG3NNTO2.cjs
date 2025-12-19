"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkL6YAM3ECcjs = require('./chunk-L6YAM3EC.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunkL6YAM3ECcjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
