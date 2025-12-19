"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunkDF6YTEMAcjs = require('./chunk-DF6YTEMA.cjs');


var _chunkPKNMQ6ENcjs = require('./chunk-PKNMQ6EN.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Annotations.tsx
var _react = require('react');
var Annotations = ({ annotations }) => {
  const { scene } = _chunkPKNMQ6ENcjs.useScene.call(void 0, );
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkDF6YTEMAcjs.AnnotationsPlugin)(
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
    [annotations, scene]
  );
  _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, [annotations]);
  return null;
};



exports.Annotations = Annotations;
