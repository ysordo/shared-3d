"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkHWEQELQ6cjs = require('./chunk-HWEQELQ6.cjs');


var _chunkDF6YTEMAcjs = require('./chunk-DF6YTEMA.cjs');


var _chunkL3KVNMIIcjs = require('./chunk-L3KVNMII.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Annotations.tsx
var _react = require('react');
var Annotations = ({ annotations }) => {
  const { scene } = _chunkL3KVNMIIcjs.useScene.call(void 0, );
  const data = _react.useMemo.call(void 0, () => {
    return annotations.map((ann) => {
      const target = typeof ann.target === "string" ? scene.getObjectByName(ann.target) : ann.target;
      return {
        id: ann.id,
        position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.position),
        target,
        content: typeof ann.content === "string" ? ann.content : String(ann.content),
        offset: ann.offset ? new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.offset) : void 0
      };
    });
  }, [annotations, scene]);
  _chunkHWEQELQ6cjs.usePlugin.call(void 0, 
    "Annotations",
    () => new (0, _chunkDF6YTEMAcjs.AnnotationsPlugin)(data),
    data
  );
  return null;
};



exports.Annotations = Annotations;
