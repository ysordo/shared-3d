"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkSLDMT4C4cjs = require('./chunk-SLDMT4C4.cjs');

// src/hooks/useActiveModel.ts
var _react = require('react');
var useActiveModel = () => {
  const orchestrator = _chunkSLDMT4C4cjs.useScene.call(void 0, );
  return _react.useSyncExternalStore.call(void 0, 
    (onChange) => {
      const loaded = () => onChange();
      const removed = () => onChange();
      orchestrator.addEventListener("model::loaded", loaded);
      orchestrator.addEventListener("model::removed", removed);
      return () => {
        orchestrator.removeEventListener("model::loaded", loaded);
        orchestrator.removeEventListener("model::removed", removed);
      };
    },
    () => orchestrator.getActiveModel()
  );
};



exports.useActiveModel = useActiveModel;
