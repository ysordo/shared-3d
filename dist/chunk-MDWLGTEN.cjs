"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkAKYFN5ANcjs = require('./chunk-AKYFN5AN.cjs');


var _chunkN5ZY62UGcjs = require('./chunk-N5ZY62UG.cjs');


var _chunkF4OPYUCGcjs = require('./chunk-F4OPYUCG.cjs');

// src/react/components/Model.tsx
var _react = require('react');
var Model = ({
  entry,
  draco = false,
  onLoaded,
  onProgress,
  onError,
  children
}) => {
  const orchestrator = _chunkN5ZY62UGcjs.useScene.call(void 0, );
  const activeModel = _chunkF4OPYUCGcjs.useActiveModel.call(void 0, );
  const preload = _chunkAKYFN5ANcjs.usePreload.call(void 0, );
  const [model, setModel] = _react.useState.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    if (activeModel && activeModel.name == entry.id) {
      return;
    }
    let cancelled = false;
    let template = entry;
    const temp = preload.get(entry.id);
    if (temp) {
      template = {
        obj: temp,
        manifest: entry
      };
    }
    orchestrator.setModel(template, {
      draco,
      onLoaded: (...prev) => {
        if (cancelled) {
          return;
        }
        setModel(prev[0]);
        _optionalChain([onLoaded, 'optionalCall', _ => _(...prev)]);
      },
      onProgress: (...prev) => {
        if (cancelled) {
          return;
        }
        _optionalChain([onProgress, 'optionalCall', _2 => _2(...prev)]);
      },
      onError: (...prev) => {
        if (cancelled) {
          return;
        }
        _optionalChain([onError, 'optionalCall', _3 => _3(...prev)]);
      }
    });
    return () => {
      cancelled = true;
      setModel(null);
      orchestrator.removeModel();
    };
  }, [entry.id, draco, orchestrator]);
  if (!model) {
    return null;
  }
  return _optionalChain([children, 'optionalCall', _4 => _4(model)]);
};



exports.Model = Model;
