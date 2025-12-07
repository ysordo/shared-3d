"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk6ZMRVN4Ucjs = require('./chunk-6ZMRVN4U.cjs');


var _chunk4C4LEAFDcjs = require('./chunk-4C4LEAFD.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({ distanceThreshold = 0.6, pushBackOffset = 0.1, enabled = true }) => {
  const orchestrator = _chunk4C4LEAFDcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!enabled || !orchestrator) {
      return;
    }
    const plugin = new (0, _chunk6ZMRVN4Ucjs.AdvancedCameraCollisionPlugin)(
      distanceThreshold,
      pushBackOffset
    );
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [enabled, distanceThreshold, pushBackOffset, orchestrator]);
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
