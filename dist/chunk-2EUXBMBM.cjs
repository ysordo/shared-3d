"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkQGWOD5X4cjs = require('./chunk-QGWOD5X4.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunkQGWOD5X4cjs.useSceneContext.call(void 0, ).preload;
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
