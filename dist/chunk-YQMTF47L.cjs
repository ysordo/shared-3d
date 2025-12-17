"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk4626SOV4cjs = require('./chunk-4626SOV4.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunk4626SOV4cjs.useSceneContext.call(void 0, ).preload;
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
