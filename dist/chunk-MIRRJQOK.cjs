"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkRDXBFNF7cjs = require('./chunk-RDXBFNF7.cjs');


var _chunkS6WVTNYXcjs = require('./chunk-S6WVTNYX.cjs');


var _chunkPKNMQ6ENcjs = require('./chunk-PKNMQ6EN.cjs');


var _chunkBS6FGAC2cjs = require('./chunk-BS6FGAC2.cjs');

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
  const orchestrator = _chunkPKNMQ6ENcjs.useScene.call(void 0, );
  const model = _chunkBS6FGAC2cjs.useActiveModel.call(void 0, );
  const cancelledRef = _react.useRef.call(void 0, false);
  _chunkRDXBFNF7cjs.usePreloadEffect.call(void 0, 
    (preload) => {
      if (!model || entry.id !== model.name) {
        cancelledRef.current = false;
        const t = preload.get(entry.id);
        if (t) {
          if (cancelledRef.current) {
            return;
          }
          orchestrator.setModel(t);
          _optionalChain([onLoaded, 'optionalCall', _ => _(t, entry)]);
          return;
        }
        _chunkS6WVTNYXcjs.GLTFLoader.load(entry, {
          draco,
          onLoaded: (obj, manifestEntry) => {
            if (cancelledRef.current) {
              return;
            }
            orchestrator.setModel(obj);
            _optionalChain([onLoaded, 'optionalCall', _2 => _2(obj, manifestEntry)]);
          },
          onProgress: (...args) => {
            if (cancelledRef.current) {
              return;
            }
            _optionalChain([onProgress, 'optionalCall', _3 => _3(...args)]);
          },
          onError: (...args) => {
            if (cancelledRef.current) {
              return;
            }
            _optionalChain([onError, 'optionalCall', _4 => _4(...args)]);
          }
        });
      }
      return () => {
        cancelledRef.current = true;
        orchestrator.removeModel();
      };
    },
    [entry.id, draco, orchestrator, onLoaded, onProgress, onError, model]
  );
  if (!model || !children) {
    return null;
  }
  return children(model);
};



exports.Model = Model;
