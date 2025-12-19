"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk4AUN7VTHcjs = require('./chunk-4AUN7VTH.cjs');

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = _chunk4AUN7VTHcjs.useSceneContext.call(void 0, );
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};



exports.usePreload = usePreload;
