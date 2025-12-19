"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


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
  _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, [id, position, target, onClick]);
  return null;
};



exports.Hotspot = Hotspot;
