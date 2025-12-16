"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEYXI6UFEcjs = require('./chunk-EYXI6UFE.cjs');


var _chunkT2JEYSOHcjs = require('./chunk-T2JEYSOH.cjs');

// src/react/components/LODSystem.tsx
var _react = require('react');
var LODSystem = ({
  levels,
  hysteresis = 0.1
}) => {
  const orchestrator = _chunkEYXI6UFEcjs.useScene.call(void 0, );
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
