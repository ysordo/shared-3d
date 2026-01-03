"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkEC2ZLY2Vcjs = require('./chunk-EC2ZLY2V.cjs');


var _chunkNZZUA7MRcjs = require('./chunk-NZZUA7MR.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Hotspot.tsx
var _react = require('react');
var Hotspot = ({
  id,
  position,
  target,
  onClick,
  visible = true
}) => {
  const pluginData = _react.useMemo.call(void 0, 
    () => [
      {
        id,
        position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...position),
        target: _nullishCoalesce(target, () => ( void 0)),
        onClick,
        visible
      }
    ],
    [id, position, target, onClick, visible]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkNZZUA7MRcjs.HotspotPlugin)([]), []);
  _chunkEC2ZLY2Vcjs.usePlugin.call(void 0, factory, pluginData);
  return null;
};



exports.Hotspot = Hotspot;
