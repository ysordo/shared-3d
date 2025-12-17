"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkERMNU45Ncjs = require('./chunk-ERMNU45N.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunkERMNU45Ncjs.useSceneContext.call(void 0, ).preload;
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
