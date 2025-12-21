"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkX2NAZ4TTcjs = require('./chunk-X2NAZ4TT.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunkX2NAZ4TTcjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
