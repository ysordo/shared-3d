"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkM6PXJ3KScjs = require('./chunk-M6PXJ3KS.cjs');


var _chunkQVBX2IUFcjs = require('./chunk-QVBX2IUF.cjs');


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
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkQVBX2IUFcjs.HotspotPlugin)([]), []);
  _chunkM6PXJ3KScjs.usePlugin.call(void 0, factory, pluginData);
  return null;
};



exports.Hotspots = Hotspots;
