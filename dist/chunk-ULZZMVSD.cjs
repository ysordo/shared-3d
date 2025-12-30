"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkOJGD2LZBcjs = require('./chunk-OJGD2LZB.cjs');


var _chunkNZZUA7MRcjs = require('./chunk-NZZUA7MR.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Hotspots.tsx
var _react = require('react');
var Hotspots = ({ hotspots }) => {
  const pluginData = _react.useMemo.call(void 0, 
    () => hotspots.map((hotspot) => ({
      id: hotspot.id,
      position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...hotspot.position),
      target: _nullishCoalesce(hotspot.target, () => ( void 0)),
      onClick: hotspot.onClick,
      visible: _nullishCoalesce(hotspot.visible, () => ( true))
    })),
    [hotspots]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkNZZUA7MRcjs.HotspotPlugin)([]), []);
  _chunkOJGD2LZBcjs.usePlugin.call(void 0, factory, pluginData);
  return null;
};



exports.Hotspots = Hotspots;
