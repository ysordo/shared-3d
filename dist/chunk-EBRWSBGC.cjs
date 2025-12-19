"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3SFNXLWIcjs = require('./chunk-3SFNXLWI.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunk3SFNXLWIcjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
