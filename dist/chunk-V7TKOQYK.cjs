"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkH3OU6HR6cjs = require('./chunk-H3OU6HR6.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunkH3OU6HR6cjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
