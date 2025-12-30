"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkF7YWHAAVcjs = require('./chunk-F7YWHAAV.cjs');



var _chunkVATNPERRcjs = require('./chunk-VATNPERR.cjs');


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
  const orchestrator = _chunkVATNPERRcjs.useScene.call(void 0, );
  const model = _chunkF7YWHAAVcjs.useActiveModel.call(void 0, );
  const { preloadModel, getPreloaded } = _chunkVATNPERRcjs.usePreload.call(void 0, );
  const cancelledRef = _react.useRef.call(void 0, false);
  _react.useEffect.call(void 0, () => {
    if (!model || entry.id !== model.name) {
      cancelledRef.current = false;
      const t = getPreloaded(entry.id);
      if (t) {
        if (cancelledRef.current) {
          return;
        }
        orchestrator.activeModel.set(t);
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
          orchestrator.activeModel.set(obj);
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
      orchestrator.activeModel.remove();
    };
  }, [entry.id, draco, orchestrator, onLoaded, onProgress, onError, model]);
  return null;
};



exports.Model = Model;
