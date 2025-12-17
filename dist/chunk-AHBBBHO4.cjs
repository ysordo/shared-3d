"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkERMNU45Ncjs = require('./chunk-ERMNU45N.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const preload = _chunkERMNU45Ncjs.useSceneContext.call(void 0, ).preload;
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
