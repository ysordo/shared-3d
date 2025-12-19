"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkGXUZS5MRcjs = require('./chunk-GXUZS5MR.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunkGXUZS5MRcjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
