"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkQQEAL6E5cjs = require('./chunk-QQEAL6E5.cjs');


var _chunkDF6YTEMAcjs = require('./chunk-DF6YTEMA.cjs');


var _chunkPKNMQ6ENcjs = require('./chunk-PKNMQ6EN.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Annotations.tsx
var _react = require('react');
var Annotations = ({ annotations }) => {
  const { scene } = _chunkPKNMQ6ENcjs.useScene.call(void 0, );
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
  _chunkQQEAL6E5cjs.usePlugin.call(void 0, 
    new (0, _chunkDF6YTEMAcjs.AnnotationsPlugin)(data),
    data
  );
  return null;
};



exports.Annotations = Annotations;
