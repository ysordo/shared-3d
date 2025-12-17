"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkACUUHTQKcjs = require('./chunk-ACUUHTQK.cjs');

// src/hooks/usePlugin.ts
var _react = require('react');
var usePlugin = (factory, deps = []) => {
  const orchestrator = _chunkACUUHTQKcjs.useScene.call(void 0, );
  const pluginRef = _react.useRef.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    if (!pluginRef.current) {
      pluginRef.current = factory();
      orchestrator.use(pluginRef.current);
    }
    return () => {
      if (pluginRef.current) {
        const name = pluginRef.current.name;
        orchestrator.remove(name);
        _optionalChain([pluginRef, 'access', _ => _.current, 'access', _2 => _2.dispose, 'optionalCall', _3 => _3()]);
        pluginRef.current = null;
      }
    };
  }, [orchestrator, ...deps]);
};



exports.usePlugin = usePlugin;
