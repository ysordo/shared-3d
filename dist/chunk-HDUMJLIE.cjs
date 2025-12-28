"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkGTPEJRWQcjs = require('./chunk-GTPEJRWQ.cjs');



var _chunkNJFICWZPcjs = require('./chunk-NJFICWZP.cjs');


var _chunkW7OITOU3cjs = require('./chunk-W7OITOU3.cjs');

// src/react/components/Model.tsx
var _react = require('react');
var Model = ({
  entry,
  draco = false,
  onLoaded,
  onProgress,
  onError
}) => {
  const orchestrator = _chunkNJFICWZPcjs.useScene.call(void 0, );
  const model = _chunkGTPEJRWQcjs.useActiveModel.call(void 0, );
  const { preloadModel, getPreloaded } = _chunkNJFICWZPcjs.usePreload.call(void 0, );
  const cancelledRef = _react.useRef.call(void 0, false);
  _react.useEffect.call(void 0, 
    () => {
      if (!model || entry.id !== model.name) {
        cancelledRef.current = false;
        const t = getPreloaded(entry.id);
        if (t) {
          if (cancelledRef.current) {
            return;
          }
          orchestrator.setModel(t);
          _optionalChain([onLoaded, 'optionalCall', _ => _(t, entry)]);
          return;
        }
        _chunkW7OITOU3cjs.GLTFLoader.load(entry, {
          draco,
          onLoaded: (obj, manifestEntry) => {
            if (cancelledRef.current) {
              return;
            }
            preloadModel(manifestEntry.id, obj);
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
  return null;
};



exports.Model = Model;
