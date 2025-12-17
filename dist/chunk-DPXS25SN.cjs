"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }

var _chunkTQDZYRSUcjs = require('./chunk-TQDZYRSU.cjs');


var _chunkXTA7BEZGcjs = require('./chunk-XTA7BEZG.cjs');


var _chunkIB6RDH7Pcjs = require('./chunk-IB6RDH7P.cjs');

// src/react/components/Hotspots.tsx
var _react = require('react');
var _three = require('three'); var THREE = _interopRequireWildcard(_three);
var Hotspots = ({ hotspots }) => {
  const orchestrator = _chunkIB6RDH7Pcjs.useScene.call(void 0, );
  const data = _react.useMemo.call(void 0, 
    () => hotspots.map((hotspot) => ({
      ...hotspot,
      position: new THREE.Vector3(...hotspot.position)
    })),
    [...hotspots]
  );
  _chunkTQDZYRSUcjs.usePlugin.call(void 0, () => new (0, _chunkXTA7BEZGcjs.HotspotPlugin)(data), [...data]);
  return null;
};



exports.Hotspots = Hotspots;
