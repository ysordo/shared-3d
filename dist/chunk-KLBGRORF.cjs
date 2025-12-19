"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk47Q3GIH6cjs = require('./chunk-47Q3GIH6.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunk47Q3GIH6cjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
