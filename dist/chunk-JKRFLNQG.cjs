"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkVRE7SNBYcjs = require('./chunk-VRE7SNBY.cjs');


var _chunk7T35AZSKcjs = require('./chunk-7T35AZSK.cjs');

// src/hooks/useRaycaster.ts
var _react = require('react');
var useRaycaster = (onEvent) => {
  const orchestrator = _chunkVRE7SNBYcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const plugin = new (0, _chunk7T35AZSKcjs.RaycasterPlugin)(onEvent);
    orchestrator.use(plugin);
    return () => {
    };
  }, [onEvent]);
};



exports.useRaycaster = useRaycaster;
