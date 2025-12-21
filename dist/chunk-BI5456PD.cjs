"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkKFFA2UWCcjs = require('./chunk-KFFA2UWC.cjs');

// src/hooks/usePlugin.ts
var _react = require('react');
function shallowDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    const valA = a[key];
    const valB = b[key];
    if (Array.isArray(valA) && Array.isArray(valB)) {
      if (valA.length !== valB.length) {
        return false;
      }
      for (let i = 0; i < valA.length; i++) {
        if (valA[i] !== valB[i]) {
          return false;
        }
      }
    } else if (valA && typeof valA === "object" && valB && typeof valB === "object") {
      if (!shallowDeepEqual(valA, valB)) {
        return false;
      }
    } else if (valA !== valB) {
      return false;
    }
  }
  return true;
}
var usePlugin = (factory, config, deps = []) => {
  const orchestrator = _chunkKFFA2UWCcjs.useScene.call(void 0, );
  const pluginRef = _react.useRef.call(void 0, null);
  const prevConfigRef = _react.useRef.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    const shouldRecreate = !shallowDeepEqual(prevConfigRef.current, config);
    if (shouldRecreate) {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        _optionalChain([pluginRef, 'access', _ => _.current, 'access', _2 => _2.dispose, 'optionalCall', _3 => _3()]);
      }
      const newPlugin = factory();
      pluginRef.current = newPlugin;
      orchestrator.use(newPlugin);
      prevConfigRef.current = config;
    } else if (pluginRef.current && "update" in pluginRef.current) {
      _optionalChain([pluginRef, 'access', _4 => _4.current, 'access', _5 => _5.update, 'optionalCall', _6 => _6(config)]);
    }
    return () => {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        _optionalChain([pluginRef, 'access', _7 => _7.current, 'access', _8 => _8.dispose, 'optionalCall', _9 => _9()]);
        pluginRef.current = null;
      }
    };
  }, [orchestrator, config, ...deps]);
  return pluginRef.current;
};



exports.usePlugin = usePlugin;
