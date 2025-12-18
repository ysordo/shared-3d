"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk2IYDYYNBcjs = require('./chunk-2IYDYYNB.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunk2IYDYYNBcjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!preload) {
      return;
    }
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
