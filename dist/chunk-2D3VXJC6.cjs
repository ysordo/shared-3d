"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3NXOKNYVcjs = require('./chunk-3NXOKNYV.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunk3NXOKNYVcjs.useSceneContext.call(void 0, ).preload;
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
