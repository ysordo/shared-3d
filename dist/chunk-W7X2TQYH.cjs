"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk4C4LEAFDcjs = require('./chunk-4C4LEAFD.cjs');

// src/hooks/useModel.ts
var _react = require('react');
var useModel = (entry, options = {}) => {
  const { draco = false, autoLoad = true } = options;
  const orchestrator = _chunk4C4LEAFDcjs.useScene.call(void 0, );
  const [model, setModel] = _react.useState.call(void 0, null);
  const [loading, setLoading] = _react.useState.call(void 0, false);
  const [error, setError] = _react.useState.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    if (!entry || !autoLoad) {
      return;
    }
    setLoading(true);
    setError(null);
    orchestrator.setModel(entry, { draco }).then((m) => {
      setModel(m);
      setLoading(false);
    }).catch((err) => {
      setError(err);
      setLoading(false);
    });
  }, [_optionalChain([entry, 'optionalAccess', _ => _.id]), draco]);
  const load = () => entry && orchestrator.setModel(entry, { draco });
  return { model, loading, error, load };
};



exports.useModel = useModel;
