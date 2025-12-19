"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkNFCEFR2Qcjs = require('./chunk-NFCEFR2Q.cjs');


var _chunkXTA7BEZGcjs = require('./chunk-XTA7BEZG.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Hotspot.tsx
var _react = require('react');
var Hotspot = ({
  id,
  position,
  target,
  onClick
}) => {
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkXTA7BEZGcjs.HotspotPlugin)([
      {
        id,
        position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...position),
        target,
        onClick
      }
    ]),
    [id, position, target, onClick]
  );
  _chunkNFCEFR2Qcjs.usePlugin.call(void 0, factory, [factory]);
  return null;
};



exports.Hotspot = Hotspot;
