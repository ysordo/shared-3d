"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkSLDMT4C4cjs = require('./chunk-SLDMT4C4.cjs');

// src/hooks/usePlugin.ts
var _react = require('react');
var usePlugin = (factory, config, deps = []) => {
  const orchestrator = _chunkSLDMT4C4cjs.useScene.call(void 0, );
  const ref = _react.useRef.call(void 0, void 0);
  _react.useEffect.call(void 0, () => {
    if (ref.current) {
      _optionalChain([ref, 'access', _ => _.current, 'optionalAccess', _2 => _2.dispose, 'optionalCall', _3 => _3()]);
      orchestrator.remove(ref.current.name);
      ref.current = void 0;
    }
    const plugin = factory();
    ref.current = orchestrator.use(plugin);
    _optionalChain([ref, 'access', _4 => _4.current, 'access', _5 => _5.update, 'optionalCall', _6 => _6(config)]);
    return () => {
      if (ref.current) {
        _optionalChain([ref, 'access', _7 => _7.current, 'optionalAccess', _8 => _8.dispose, 'optionalCall', _9 => _9()]);
        orchestrator.remove(ref.current.name);
      }
      ref.current = void 0;
    };
  }, [orchestrator, factory]);
  _react.useEffect.call(void 0, () => {
    if (!ref.current) {
      return;
    }
    if ("update" in ref.current) {
      _optionalChain([ref, 'access', _10 => _10.current, 'access', _11 => _11.update, 'optionalCall', _12 => _12(config)]);
    }
  }, [config, ...deps]);
  return ref.current;
};



exports.usePlugin = usePlugin;
