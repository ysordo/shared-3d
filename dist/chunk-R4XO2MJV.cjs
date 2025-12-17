"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk2R6Z2JCVcjs = require('./chunk-2R6Z2JCV.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunk2R6Z2JCVcjs.useSceneContext.call(void 0, ).preload;
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
