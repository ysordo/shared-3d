"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkWRTDY7IMcjs = require('./chunk-WRTDY7IM.cjs');

// src/hooks/useHDRI.ts
var _react = require('react');
var useHDRI = (entry) => {
  const orchestrator = _chunkWRTDY7IMcjs.useScene.call(void 0, );
  const [hdri, setHDRI] = _react.useState.call(void 0, null);
  const [loading, setLoading] = _react.useState.call(void 0, false);
  _react.useEffect.call(void 0, () => {
    if (!entry) {
      return;
    }
    setLoading(true);
    orchestrator.setHDRI(entry).then((tex) => {
      setHDRI(tex);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [_optionalChain([entry, 'optionalAccess', _ => _.id])]);
  const clear = () => orchestrator.clearHDRI();
  return { hdri, loading, clear };
};



exports.useHDRI = useHDRI;
