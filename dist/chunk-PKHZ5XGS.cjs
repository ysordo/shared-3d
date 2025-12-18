"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkTU5C2OWZcjs = require('./chunk-TU5C2OWZ.cjs');


var _chunkDF6YTEMAcjs = require('./chunk-DF6YTEMA.cjs');


var _chunk5DEHJDNUcjs = require('./chunk-5DEHJDNU.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Annotations.tsx
var _react = require('react');
var Annotations = ({ annotations }) => {
  const orchestrator = _chunk5DEHJDNUcjs.useScene.call(void 0, );
  const data = _react.useMemo.call(void 0, () => {
    return annotations.map((ann) => {
      if (!orchestrator) {
        return;
      }
      const target = typeof ann.target === "string" ? orchestrator.scene.getObjectByName(ann.target) : ann.target;
      return {
        id: ann.id,
        position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.position),
        target,
        content: typeof ann.content === "string" ? ann.content : String(ann.content),
        offset: ann.offset ? new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.offset) : void 0
      };
    });
  }, [annotations, orchestrator, _optionalChain([orchestrator, 'optionalAccess', _ => _.scene])]);
  _chunkTU5C2OWZcjs.usePlugin.call(void 0, () => new (0, _chunkDF6YTEMAcjs.AnnotationsPlugin)(data), [data]);
  return null;
};



exports.Annotations = Annotations;
