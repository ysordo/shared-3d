"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkT2JEYSOHcjs = require('./chunk-T2JEYSOH.cjs');


var _chunk5C4PNMUPcjs = require('./chunk-5C4PNMUP.cjs');

// src/react/components/LODSystem.tsx
var _react = require('react');
var LODSystem = ({
  levels,
  hysteresis = 0.1
}) => {
  const orchestrator = _chunk5C4PNMUPcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const plugin = new (0, _chunkT2JEYSOHcjs.LODSystemPlugin)([{ levels, hysteresis }]);
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [levels, hysteresis]);
  return null;
};



exports.LODSystem = LODSystem;
