"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkNY5P5I4Scjs = require('./chunk-NY5P5I4S.cjs');


var _chunkMEH4EQN5cjs = require('./chunk-MEH4EQN5.cjs');

// src/react/components/Model.tsx
var _react = require('react');
var Model = ({
  entry,
  draco = false,
  children,
  onLoaded,
  onProgress,
  onError
}) => {
  const orchestrator = _chunkMEH4EQN5cjs.useScene.call(void 0, );
  const cancelledRef = _react.useRef.call(void 0, false);
  _react.useEffect.call(void 0, () => {
    cancelledRef.current = false;
    _chunkNY5P5I4Scjs.GLTFLoader.load(entry, {
      draco,
      onLoaded: (obj, manifestEntry) => {
        if (cancelledRef.current) {
          return;
        }
        orchestrator.setModel(obj);
        _optionalChain([onLoaded, 'optionalCall', _ => _(obj, manifestEntry)]);
      },
      onProgress: (...args) => {
        if (cancelledRef.current) {
          return;
        }
        _optionalChain([onProgress, 'optionalCall', _2 => _2(...args)]);
      },
      onError: (...args) => {
        if (cancelledRef.current) {
          return;
        }
        _optionalChain([onError, 'optionalCall', _3 => _3(...args)]);
      }
    });
    return () => {
      cancelledRef.current = true;
      orchestrator.removeModel();
    };
  }, [entry.id, draco, orchestrator]);
  const model = orchestrator.getActiveModel();
  if (!model || !children) {
    return null;
  }
  return children(model);
};



exports.Model = Model;
