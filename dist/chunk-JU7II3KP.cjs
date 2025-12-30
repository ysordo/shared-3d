"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkOJGD2LZBcjs = require('./chunk-OJGD2LZB.cjs');


var _chunkVATNPERRcjs = require('./chunk-VATNPERR.cjs');


var _chunkTWEP2EPPcjs = require('./chunk-TWEP2EPP.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Annotations.tsx
var _react = require('react');
var Annotations = ({ annotations }) => {
  const { scene } = _chunkVATNPERRcjs.useScene.call(void 0, );
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
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkTWEP2EPPcjs.AnnotationsPlugin)([]), []);
  _chunkOJGD2LZBcjs.usePlugin.call(void 0, factory, pluginData);
  return null;
};



exports.Annotations = Annotations;
