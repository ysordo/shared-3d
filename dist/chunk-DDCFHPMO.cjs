"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkA42KOQBFcjs = require('./chunk-A42KOQBF.cjs');


var _chunk4C4LEAFDcjs = require('./chunk-4C4LEAFD.cjs');

// src/react/components/AutoLODSystem.tsx
var _react = require('react');
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100
}) => {
  const orchestrator = _chunk4C4LEAFDcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const plugin = new (0, _chunkA42KOQBFcjs.AutoLODSystemPlugin)({
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
