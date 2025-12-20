"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkRDXBFNF7cjs = require('./chunk-RDXBFNF7.cjs');


var _chunkFVN3RA46cjs = require('./chunk-FVN3RA46.cjs');

// src/react/components/ModelPreload.tsx
var _react = require('react');
var ModelPreload = ({
  entries,
  draco = false,
  onProgress
}) => {
  const data = _react.useMemo.call(void 0, 
    () => ({ entries, draco, onProgress }),
    [entries, draco, onProgress]
  );
  const deps = _react.useMemo.call(void 0, 
    () => [...Object.values(data)],
    [...Object.values(data)]
  );
  _chunkRDXBFNF7cjs.usePreloadEffect.call(void 0, (preload) => {
    _chunkFVN3RA46cjs.GLTFLoader.preload(
      data.entries,
      { draco: data.draco },
      (obj, { id }, completed, total, percent) => {
        if (obj) {
          preload.set(id, obj);
        }
        _optionalChain([onProgress, 'optionalCall', _ => _(id, completed, total, percent)]);
      }
    );
  }, deps);
  return null;
};



exports.ModelPreload = ModelPreload;
