"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkJQYMBYTOcjs = require('./chunk-JQYMBYTO.cjs');

// src/react/components/ARButton.tsx
var _react = require('react');
var _ARButtonjs = require('three/examples/jsm/webxr/ARButton.js');
var ARButton = () => {
  const { renderer } = _chunkJQYMBYTOcjs.useScene.call(void 0, );
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
