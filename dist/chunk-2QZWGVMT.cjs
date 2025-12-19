"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkBUTP2CUPcjs = require('./chunk-BUTP2CUP.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunkBUTP2CUPcjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
