"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunkXTA7BEZGcjs = require('./chunk-XTA7BEZG.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Hotspots.tsx
var _react = require('react');
var Hotspots = ({ hotspots }) => {
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkXTA7BEZGcjs.HotspotPlugin)(
      hotspots.map((hotspot) => ({
        ...hotspot,
        position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...hotspot.position)
      }))
    ),
    [hotspots]
  );
  _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, [hotspots]);
  return null;
};



exports.Hotspots = Hotspots;
