"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunkTQREXSNKcjs = require('./chunk-TQREXSNK.cjs');


var _chunkPKNMQ6ENcjs = require('./chunk-PKNMQ6EN.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Annotations.tsx
var _react = require('react');
var Annotations = ({ annotations }) => {
  const { scene } = _chunkPKNMQ6ENcjs.useScene.call(void 0, );
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkTQREXSNKcjs.AnnotationsPlugin)(
      annotations.map((ann) => {
        const target = typeof ann.target === "string" ? scene.getObjectByName(ann.target) : ann.target;
        return {
          id: ann.id,
          position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.position),
          target,
          content: typeof ann.content === "string" ? ann.content : String(ann.content),
          offset: ann.offset ? new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.offset) : void 0
        };
      })
    ),
    []
  );
  const plugin = _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, [annotations]);
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _ => _.update, 'call', _2 => _2(
      annotations.map((ann) => {
        const target = typeof ann.target === "string" ? scene.getObjectByName(ann.target) : ann.target;
        return {
          id: ann.id,
          position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.position),
          target,
          content: typeof ann.content === "string" ? ann.content : String(ann.content),
          offset: ann.offset ? new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.offset) : void 0
        };
      })
    )]);
  }, [annotations, plugin]);
  return null;
};



exports.Annotations = Annotations;
