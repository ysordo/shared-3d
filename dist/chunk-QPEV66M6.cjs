"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkN2QDSU7Ecjs = require('./chunk-N2QDSU7E.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunkN2QDSU7Ecjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
