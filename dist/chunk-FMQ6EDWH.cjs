"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkJQYMBYTOcjs = require('./chunk-JQYMBYTO.cjs');

// src/react/components/HDRI.tsx
var _react = require('react');
var HDRI = ({
  entry,
  config = {},
  onLoaded,
  onProgress,
  onError
}) => {
  const orchestrator = _chunkJQYMBYTOcjs.useScene.call(void 0, );
  const handleHDRIEvent = _react.useCallback.call(void 0, 
    (event) => {
      if (_optionalChain([event, 'access', _ => _.entry, 'optionalAccess', _2 => _2.id]) !== entry.id) {
        return;
      }
      switch (event.type) {
        case "hdri::loaded":
          _optionalChain([onLoaded, 'optionalCall', _3 => _3({
            texture: event.texture,
            entry: event.entry,
            config: event.config
          })]);
          break;
        case "hdri::progress":
          _optionalChain([onProgress, 'optionalCall', _4 => _4({
            progress: event.progress,
            entry: event.entry
          })]);
          break;
        case "hdri::error":
          _optionalChain([onError, 'optionalCall', _5 => _5({
            error: event.error,
            entry: event.entry
          })]);
          break;
      }
    },
    [entry.id, onLoaded, onProgress, onError]
  );
  _react.useEffect.call(void 0, () => {
    if (!orchestrator || !orchestrator.addEventListener) {
      return;
    }
    orchestrator.addEventListener("hdri::loaded", handleHDRIEvent);
    orchestrator.addEventListener("hdri::progress", handleHDRIEvent);
    orchestrator.addEventListener("hdri::error", handleHDRIEvent);
    orchestrator.setHDRI(entry, config).catch(console.error);
    return () => {
      orchestrator.removeEventListener("hdri::loaded", handleHDRIEvent);
      orchestrator.removeEventListener("hdri::progress", handleHDRIEvent);
      orchestrator.removeEventListener("hdri::error", handleHDRIEvent);
      if (orchestrator.clearHDRI) {
        orchestrator.clearHDRI();
      }
    };
  }, [orchestrator, entry.id, handleHDRIEvent, config]);
  return null;
};



exports.HDRI = HDRI;
