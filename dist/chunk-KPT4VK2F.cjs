"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTOIGUY7Scjs = require('./chunk-TOIGUY7S.cjs');


var _chunk5BVZFCCPcjs = require('./chunk-5BVZFCCP.cjs');

// src/react/components/OrbitControls.tsx
var _react = require('react');
var OrbitControls = () => {
  const orchestrator = _chunk5BVZFCCPcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    orchestrator.use(new (0, _chunkTOIGUY7Scjs.OrbitControlsPlugin)());
  }, [orchestrator]);
  return null;
};



exports.OrbitControls = OrbitControls;
