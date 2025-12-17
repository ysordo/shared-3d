"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk4626SOV4cjs = require('./chunk-4626SOV4.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const preload = _chunk4626SOV4cjs.useSceneContext.call(void 0, ).preload;
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
