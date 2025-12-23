"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk46WGDOY7cjs = require('./chunk-46WGDOY7.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunk46WGDOY7cjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
