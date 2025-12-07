"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTOIGUY7Scjs = require('./chunk-TOIGUY7S.cjs');


var _chunk4C4LEAFDcjs = require('./chunk-4C4LEAFD.cjs');

// src/react/components/OrbitControls.tsx
var _react = require('react');
var OrbitControls = () => {
  const orchestrator = _chunk4C4LEAFDcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    orchestrator.use(new (0, _chunkTOIGUY7Scjs.OrbitControlsPlugin)());
  }, [orchestrator]);
  return null;
};



exports.OrbitControls = OrbitControls;
