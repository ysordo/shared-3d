"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkZKG3D4LTcjs = require('./chunk-ZKG3D4LT.cjs');


var _chunkXGVWG5RUcjs = require('./chunk-XGVWG5RU.cjs');


var _chunkKFFA2UWCcjs = require('./chunk-KFFA2UWC.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Annotations.tsx
var _react = require('react');
var Annotations = ({ annotations }) => {
  const { scene } = _chunkKFFA2UWCcjs.useScene.call(void 0, );
  const pluginData = _react.useMemo.call(void 0, 
    () => annotations.map((ann) => {
      const target = typeof ann.target === "string" ? scene.getObjectByName(ann.target) : ann.target;
      return {
        id: ann.id,
        position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.position),
        target,
        content: typeof ann.content === "string" ? ann.content : String(ann.content),
        offset: ann.offset ? new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.offset) : void 0,
        visible: true
        // siempre visible por defecto (puede extenderse en futuro)
      };
    }),
    [annotations, scene]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkXGVWG5RUcjs.AnnotationsPlugin)([]), []);
  _chunkZKG3D4LTcjs.usePlugin.call(void 0, factory, pluginData);
  return null;
};



exports.Annotations = Annotations;
