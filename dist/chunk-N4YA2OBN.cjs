"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkPKNMQ6ENcjs = require('./chunk-PKNMQ6EN.cjs');

// src/hooks/usePlugin.ts
var _react = require('react');
var usePlugin = (factory, deps = []) => {
  const orchestrator = _chunkPKNMQ6ENcjs.useScene.call(void 0, );
  const pluginRef = _react.useRef.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    if (pluginRef.current && orchestrator.has(pluginRef.current.name)) {
      return;
    }
    if (pluginRef.current) {
      orchestrator.remove(pluginRef.current.name);
      _optionalChain([pluginRef, 'access', _ => _.current, 'access', _2 => _2.dispose, 'optionalCall', _3 => _3()]);
    }
    const plugin = factory();
    pluginRef.current = plugin;
    if (orchestrator.has(plugin.name)) {
      console.warn(`[usePlugin] Plugin "${plugin.name}" ya existe. Sobrescribiendo.`);
      orchestrator.remove(plugin.name);
    }
    orchestrator.use(plugin);
    return () => {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        _optionalChain([pluginRef, 'access', _4 => _4.current, 'access', _5 => _5.dispose, 'optionalCall', _6 => _6()]);
        pluginRef.current = null;
      }
    };
  }, [orchestrator, ...deps]);
  return pluginRef.current;
};



exports.usePlugin = usePlugin;
