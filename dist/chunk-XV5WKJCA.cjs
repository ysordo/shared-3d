"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk6ZMRVN4Ucjs = require('./chunk-6ZMRVN4U.cjs');


var _chunk3UB2S2P3cjs = require('./chunk-3UB2S2P3.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({ distanceThreshold = 0.6, pushBackOffset = 0.1, enabled = true }) => {
  const orchestrator = _chunk3UB2S2P3cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!enabled) {
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
  }, [enabled, distanceThreshold, pushBackOffset]);
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
