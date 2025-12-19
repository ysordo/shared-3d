"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }

var _chunk4WJJR7YBcjs = require('./chunk-4WJJR7YB.cjs');


var _chunkXTA7BEZGcjs = require('./chunk-XTA7BEZG.cjs');


var _chunkP3X2SDUWcjs = require('./chunk-P3X2SDUW.cjs');

// src/react/components/Hotspots.tsx
var _react = require('react');
var _three = require('three'); var THREE = _interopRequireWildcard(_three);
var Hotspots = ({ hotspots }) => {
  const orchestrator = _chunkP3X2SDUWcjs.useScene.call(void 0, );
  const data = _react.useMemo.call(void 0, 
    () => hotspots.map((hotspot) => ({
      ...hotspot,
      position: new THREE.Vector3(...hotspot.position)
    })),
    [...hotspots]
  );
  _chunk4WJJR7YBcjs.usePlugin.call(void 0, () => new (0, _chunkXTA7BEZGcjs.HotspotPlugin)(data), [...data]);
  return null;
};



exports.Hotspots = Hotspots;
