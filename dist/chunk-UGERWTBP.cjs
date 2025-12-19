"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkQPEV66M6cjs = require('./chunk-QPEV66M6.cjs');


var _chunkNY5P5I4Scjs = require('./chunk-NY5P5I4S.cjs');

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
  _chunkQPEV66M6cjs.usePreloadEffect.call(void 0, (preload) => {
    _chunkNY5P5I4Scjs.GLTFLoader.preload(data.entries, { draco: data.draco }, (...prev) => {
      preload.set(prev[1].id, prev[0]);
      _optionalChain([onProgress, 'optionalCall', _ => _(prev[2], prev[3])]);
    });
  }, [...Object.values(data)]);
  return null;
};



exports.ModelPreload = ModelPreload;
