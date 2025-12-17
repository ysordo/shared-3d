"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk2R6Z2JCVcjs = require('./chunk-2R6Z2JCV.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const preload = _chunk2R6Z2JCVcjs.useSceneContext.call(void 0, ).preload;
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
