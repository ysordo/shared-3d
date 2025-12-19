"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk4PVB6VAWcjs = require('./chunk-4PVB6VAW.cjs');

// src/hooks/useHDRI.ts
var _react = require('react');
var useHDRI = (entry) => {
  const orchestrator = _chunk4PVB6VAWcjs.useScene.call(void 0, );
  const [hdri, setHDRI] = _react.useState.call(void 0, null);
  const [loading, setLoading] = _react.useState.call(void 0, false);
  const currentEntryRef = _react.useRef.call(void 0, null);
  const abortRef = _react.useRef.call(void 0, () => {
  });
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    if (!entry) {
      setHDRI(null);
      setLoading(false);
      return;
    }
    abortRef.current();
    currentEntryRef.current = entry;
    setLoading(true);
    let cancelled = false;
    abortRef.current = () => {
      cancelled = true;
    };
    orchestrator.setHDRI(entry).then((tex) => {
      if (cancelled || _optionalChain([currentEntryRef, 'access', _ => _.current, 'optionalAccess', _2 => _2.id]) !== entry.id) {
        return;
      }
      setHDRI(tex);
      setLoading(false);
    }).catch((err) => {
      if (cancelled) {
        return;
      }
      console.error("[useHDRI] Error loading HDRI:", err);
      setLoading(false);
    });
    return () => {
      abortRef.current();
    };
  }, [_optionalChain([entry, 'optionalAccess', _3 => _3.id]), orchestrator]);
  const clear = () => {
    if (!orchestrator) {
      throw console.error("[useHDRI] Error orchestrator is not created.");
    }
    orchestrator.clearHDRI();
    setHDRI(null);
  };
  return { hdri, loading, clear };
};



exports.useHDRI = useHDRI;
