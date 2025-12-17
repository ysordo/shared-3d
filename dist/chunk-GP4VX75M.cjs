"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3NXOKNYVcjs = require('./chunk-3NXOKNYV.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const preload = _chunk3NXOKNYVcjs.useSceneContext.call(void 0, ).preload;
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
