"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkAKYFN5ANcjs = require('./chunk-AKYFN5AN.cjs');


var _chunkNY5P5I4Scjs = require('./chunk-NY5P5I4S.cjs');

// src/react/components/ModelPreload.tsx
var _react = require('react');
var ModelPreload = ({
  entries,
  draco = false,
  onProgress
}) => {
  const preload = _chunkAKYFN5ANcjs.usePreload.call(void 0, );
  _react.useEffect.call(void 0, () => {
    _chunkNY5P5I4Scjs.GLTFLoader.preload(entries, { draco }, (...prev) => {
      preload.set(prev[1].id, prev[0]);
      _optionalChain([onProgress, 'optionalCall', _ => _(prev[2], prev[3])]);
    });
  }, [entries, draco, onProgress]);
  return null;
};



exports.ModelPreload = ModelPreload;
