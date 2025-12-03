"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkW4PDMXIPcjs = require('./chunk-W4PDMXIP.cjs');

// src/react/components/Model.tsx
var _react = require('react');
var Model = ({
  entry,
  draco = false,
  children
}) => {
  const orchestrator = _chunkW4PDMXIPcjs.useScene.call(void 0, );
  const [model, setModel] = _react.useState.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    const load = async () => {
      const gltf = await orchestrator.setModel(entry, { draco });
      setModel(gltf);
    };
    load();
  }, [entry.id, draco]);
  if (!model) {
    return null;
  }
  return _optionalChain([children, 'optionalCall', _ => _(model)]);
};



exports.Model = Model;
