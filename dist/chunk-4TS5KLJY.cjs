"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkRO6RALGLcjs = require('./chunk-RO6RALGL.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunkRO6RALGLcjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
