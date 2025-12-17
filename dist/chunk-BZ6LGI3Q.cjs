"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkYYS2V2UHcjs = require('./chunk-YYS2V2UH.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const preload = _chunkYYS2V2UHcjs.useSceneContext.call(void 0, ).preload;
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
