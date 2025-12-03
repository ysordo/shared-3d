"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkNJLVDX7Jcjs = require('./chunk-NJLVDX7J.cjs');


var _chunkW4PDMXIPcjs = require('./chunk-W4PDMXIP.cjs');

// src/react/components/AutoLODSystem.tsx
var _react = require('react');
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100
}) => {
  const orchestrator = _chunkW4PDMXIPcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const plugin = new (0, _chunkNJLVDX7Jcjs.AutoLODSystemPlugin)({
      distances: [mediumDistance, lowDistance, hideDistance]
    });
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [mediumDistance, lowDistance, hideDistance]);
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
