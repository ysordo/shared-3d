"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkNFCEFR2Qcjs = require('./chunk-NFCEFR2Q.cjs');


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
  _chunkNFCEFR2Qcjs.usePlugin.call(void 0, factory, [factory]);
  return null;
};



exports.Hotspots = Hotspots;
