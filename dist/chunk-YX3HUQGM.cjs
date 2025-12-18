"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkIVS6J37Vcjs = require('./chunk-IVS6J37V.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunkIVS6J37Vcjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!preload) {
      return;
    }
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
