"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk2SIOH7S5cjs = require('./chunk-2SIOH7S5.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunk2SIOH7S5cjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
