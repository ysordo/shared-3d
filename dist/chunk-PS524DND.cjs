"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }

var _chunkXTA7BEZGcjs = require('./chunk-XTA7BEZG.cjs');


var _chunkUA2EXMCPcjs = require('./chunk-UA2EXMCP.cjs');

// src/react/components/Hotspots.tsx
var _react = require('react');
var _three = require('three'); var THREE = _interopRequireWildcard(_three);
var Hotspots = ({ hotspots }) => {
  const orchestrator = _chunkUA2EXMCPcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const data = hotspots.map((h) => ({
      id: h.id,
      position: new THREE.Vector3(...h.position),
      target: typeof h.target === "string" ? orchestrator.scene.getObjectByName(h.target) : h.target,
      onClick: h.onClick,
      offset: h.offset ? new THREE.Vector3(...h.offset) : void 0
    }));
    const plugin = new (0, _chunkXTA7BEZGcjs.HotspotPlugin)(data);
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [hotspots, orchestrator]);
  return null;
};



exports.Hotspots = Hotspots;
