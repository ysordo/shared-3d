"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkIG3NNTO2cjs = require('./chunk-IG3NNTO2.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunkIG3NNTO2cjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
