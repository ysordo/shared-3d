"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkM7PRZUXUcjs = require('./chunk-M7PRZUXU.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunkM7PRZUXUcjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
