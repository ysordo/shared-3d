"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkJEORJOC4cjs = require('./chunk-JEORJOC4.cjs');

// src/hooks/usePlugin.ts
var _react = require('react');
var usePlugin = (factory, config, deps = []) => {
  const orchestrator = _chunkJEORJOC4cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const temp = orchestrator.plugin((void 0).name);
    if (temp) {
      orchestrator.remove(_optionalChain([temp, 'optionalAccess', _ => _.name]));
      _optionalChain([temp, 'optionalAccess', _2 => _2.dispose, 'optionalCall', _3 => _3()]);
    }
    orchestrator.use(factory());
    return () => {
      if (temp) {
        orchestrator.remove(temp.name);
        _optionalChain([temp, 'access', _4 => _4.dispose, 'optionalCall', _5 => _5()]);
      }
    };
  }, [orchestrator, factory]);
  _react.useEffect.call(void 0, () => {
    const temp = orchestrator.plugin((void 0).name);
    if (!temp) {
      return;
    }
    if ("update" in temp) {
      _optionalChain([temp, 'access', _6 => _6.update, 'optionalCall', _7 => _7(config)]);
    }
  }, [config, ...deps]);
  return _nullishCoalesce(orchestrator.plugin((void 0).name), () => ( null));
};



exports.usePlugin = usePlugin;
