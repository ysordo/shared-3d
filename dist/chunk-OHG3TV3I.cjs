"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunkGHGMXPFTcjs = require('./chunk-GHGMXPFT.cjs');

// src/react/components/PostProcessing.tsx
var _react = require('react');
var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkGHGMXPFTcjs.PostProcessingPlugin)({ enabled, bloom }),
    [enabled, bloom]
  );
  const plugin = _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, []);
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _ => _.update, 'call', _2 => _2({ enabled, bloom })]);
  }, [enabled, bloom, plugin]);
  if (!enabled) {
    return null;
  }
  return null;
};



exports.PostProcessing = PostProcessing;
