"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3UB2S2P3cjs = require('./chunk-3UB2S2P3.cjs');

// src/react/components/ARButton.tsx
var _react = require('react');
var _ARButtonjs = require('three/examples/jsm/webxr/ARButton.js');
var ARButton = () => {
  const { renderer } = _chunk3UB2S2P3cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!renderer) {
      return;
    }
    renderer.xr.enabled = true;
    const button = _ARButtonjs.ARButton.createButton(renderer);
    document.body.appendChild(button);
    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [renderer]);
  return null;
};



exports.ARButton = ARButton;
