"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk7J7CBFY2cjs = require('./chunk-7J7CBFY2.cjs');

// src/react/hooks/useActiveModel.ts
var _react = require('react');
var useActiveModel = () => {
  const orchestrator = _chunk7J7CBFY2cjs.useScene.call(void 0, );
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
    () => orchestrator.activeModel.get()
  );
};



exports.useActiveModel = useActiveModel;
