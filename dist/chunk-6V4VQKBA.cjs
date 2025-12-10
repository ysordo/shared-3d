"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkXTA7BEZGcjs = require('./chunk-XTA7BEZG.cjs');


var _chunkJE3CNDUJcjs = require('./chunk-JE3CNDUJ.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/Hotspot.tsx
var _react = require('react');
var Hotspot = ({
  id,
  position,
  target,
  onClick
}) => {
  const orchestrator = _chunkJE3CNDUJcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const plugin = new (0, _chunkXTA7BEZGcjs.HotspotPlugin)([
      {
        id,
        position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...position),
        target,
        onClick
      }
    ]);
    orchestrator.use(plugin);
    return () => plugin.dispose();
  }, [id, position, target, onClick]);
  return null;
};



exports.Hotspot = Hotspot;
