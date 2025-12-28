"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkHPWY57UUcjs = require('./chunk-HPWY57UU.cjs');

// src/react/components/HDRI.tsx
var _react = require('react');
var HDRI = ({
  entry,
  exposure = 1,
  maxLuminance = 16,
  onLoaded,
  onProgress,
  onError
}) => {
  const orch = _chunkHPWY57UUcjs.useScene.call(void 0, );
  const isHandle = _react.useRef.call(void 0, false);
  const isloaded = _react.useRef.call(void 0, false);
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
          isloaded.current = true;
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
    if (!isHandle.current) {
      orch.addEventListener(
        "hdri::loaded",
        handleHDRIEvent
      );
      orch.addEventListener(
        "hdri::progress",
        handleHDRIEvent
      );
      orch.addEventListener(
        "hdri::error",
        handleHDRIEvent
      );
      isHandle.current = true;
    }
    if (isHandle.current) {
      if (_optionalChain([orch, 'access', _6 => _6.getActiveHDRI, 'call', _7 => _7(), 'optionalAccess', _8 => _8.name]) !== entry.id && !isloaded.current) {
        isloaded.current = false;
        orch.setHDRI(entry, { exposure, maxLuminance }).catch(console.error);
      }
    }
    return () => {
      isHandle.current = false;
      orch.removeEventListener(
        "hdri::loaded",
        handleHDRIEvent
      );
      orch.removeEventListener(
        "hdri::progress",
        handleHDRIEvent
      );
      orch.removeEventListener(
        "hdri::error",
        handleHDRIEvent
      );
      orch.clearHDRI();
      isloaded.current = false;
    };
  }, [entry.id, exposure, handleHDRIEvent, maxLuminance, orch]);
  return null;
};



exports.HDRI = HDRI;
