"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkFWYLDBJZcjs = require('./chunk-FWYLDBJZ.cjs');


var _chunkFVN3RA46cjs = require('./chunk-FVN3RA46.cjs');


var _chunkKFFA2UWCcjs = require('./chunk-KFFA2UWC.cjs');


var _chunkWASGUTQDcjs = require('./chunk-WASGUTQD.cjs');

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
  const orchestrator = _chunkKFFA2UWCcjs.useScene.call(void 0, );
  const model = _chunkWASGUTQDcjs.useActiveModel.call(void 0, );
  const cancelledRef = _react.useRef.call(void 0, false);
  _chunkFWYLDBJZcjs.usePreloadEffect.call(void 0, 
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
        _chunkFVN3RA46cjs.GLTFLoader.load(entry, {
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
