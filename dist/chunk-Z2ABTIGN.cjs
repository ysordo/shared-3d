"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkQEXPEXQRcjs = require('./chunk-QEXPEXQR.cjs');


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
  const data = _react.useMemo.call(void 0, 
    () => ({
      id,
      position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...position),
      target,
      onClick
    }),
    [id, position, target, onClick]
  );
  _chunkQEXPEXQRcjs.usePlugin.call(void 0, () => new (0, _chunkXTA7BEZGcjs.HotspotPlugin)([data]), [data]);
  return null;
};



exports.Hotspot = Hotspot;
