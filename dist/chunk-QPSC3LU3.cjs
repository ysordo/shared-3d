"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkJ7M3GXH6cjs = require('./chunk-J7M3GXH6.cjs');


var _chunk7T35AZSKcjs = require('./chunk-7T35AZSK.cjs');

// src/hooks/useRaycaster.ts
var _react = require('react');
var useRaycaster = (onEvent) => {
  const orchestrator = _chunkJ7M3GXH6cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const plugin = new (0, _chunk7T35AZSKcjs.RaycasterPlugin)(onEvent);
    orchestrator.use(plugin);
    return () => {
    };
  }, [onEvent]);
};



exports.useRaycaster = useRaycaster;
