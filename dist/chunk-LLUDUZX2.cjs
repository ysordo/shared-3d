"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkJEORJOC4cjs = require('./chunk-JEORJOC4.cjs');

// src/hooks/usePlugin.ts
var _react = require('react');
var usePlugin = (factory, config, deps = []) => {
  const orchestrator = _chunkJEORJOC4cjs.useScene.call(void 0, );
  const [name, setName] = _react.useState.call(void 0, "");
  _react.useEffect.call(void 0, () => {
    if (orchestrator.has(name)) {
      _optionalChain([orchestrator, 'access', _ => _.plugin, 'call', _2 => _2(name), 'optionalAccess', _3 => _3.dispose, 'optionalCall', _4 => _4()]);
      orchestrator.remove(name);
    }
    const plugin = factory();
    setName(plugin.name);
    orchestrator.use(plugin);
    return () => {
      if (orchestrator.has(name)) {
        _optionalChain([orchestrator, 'access', _5 => _5.plugin, 'call', _6 => _6(name), 'optionalAccess', _7 => _7.dispose, 'optionalCall', _8 => _8()]);
        orchestrator.remove(name);
      }
      setName("");
    };
  }, [orchestrator, factory]);
  _react.useEffect.call(void 0, () => {
    if (!orchestrator.has(name)) {
      return;
    }
    const temp = orchestrator.plugin(name);
    if ("update" in temp) {
      _optionalChain([temp, 'access', _9 => _9.update, 'optionalCall', _10 => _10(config)]);
    }
  }, [name, config, ...deps]);
  return orchestrator.plugin(name);
};



exports.usePlugin = usePlugin;
