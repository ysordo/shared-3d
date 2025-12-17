"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkQGWOD5X4cjs = require('./chunk-QGWOD5X4.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const preload = _chunkQGWOD5X4cjs.useSceneContext.call(void 0, ).preload;
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
