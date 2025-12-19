"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3DUZU4VUcjs = require('./chunk-3DUZU4VU.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunk3DUZU4VUcjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
