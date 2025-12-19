"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkL3KVNMIIcjs = require('./chunk-L3KVNMII.cjs');

// src/hooks/usePlugin.ts
var _react = require('react');
var usePlugin = (factory, deps = []) => {
  const orch = _chunkL3KVNMIIcjs.useScene.call(void 0, );
  const plugin = _react.useRef.call(void 0, factory);
  _react.useEffect.call(void 0, () => {
    orch.use(plugin.current);
    return () => {
      if (plugin.current) {
        _optionalChain([plugin, 'access', _ => _.current, 'access', _2 => _2.dispose, 'optionalCall', _3 => _3()]);
        orch.remove(factory.name);
      }
    };
  }, deps);
  return plugin.current;
};



exports.usePlugin = usePlugin;
