"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk5BVZFCCPcjs = require('./chunk-5BVZFCCP.cjs');

// src/react/components/VRButton.tsx
var _react = require('react');
var _VRButtonjs = require('three/examples/jsm/webxr/VRButton.js');
var VRButton = () => {
  const { renderer } = _chunk5BVZFCCPcjs.useScene.call(void 0, );
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
