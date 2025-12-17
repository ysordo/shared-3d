"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkMEH4EQN5cjs = require('./chunk-MEH4EQN5.cjs');

// src/react/components/VRButton.tsx
var _react = require('react');
var _VRButtonjs = require('three/examples/jsm/webxr/VRButton.js');
var VRButton = () => {
  const { renderer } = _chunkMEH4EQN5cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!renderer) {
      return;
    }
    renderer.xr.enabled = true;
    const button = _VRButtonjs.VRButton.createButton(renderer);
    document.body.appendChild(button);
    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [renderer]);
  return null;
};



exports.VRButton = VRButton;
