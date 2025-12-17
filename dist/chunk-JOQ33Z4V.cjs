"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkYYS2V2UHcjs = require('./chunk-YYS2V2UH.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunkYYS2V2UHcjs.useSceneContext.call(void 0, ).preload;
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
