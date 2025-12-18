"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk4VF3UEKTcjs = require('./chunk-4VF3UEKT.cjs');

// src/hooks/usePreloadEffect.ts
var _react = require('react');
var usePreloadEffect = (factory, deps = []) => {
  const preload = _chunk4VF3UEKTcjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!preload) {
      return;
    }
    factory(preload);
  }, [...deps]);
};



exports.usePreloadEffect = usePreloadEffect;
