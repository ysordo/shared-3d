"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkXRNKCSHRcjs = require('./chunk-XRNKCSHR.cjs');

// src/react/components/Canvas.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var Canvas = _react.forwardRef.call(void 0, 
  ({ config, children, ...canvasProps }, ref) => {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkXRNKCSHRcjs.SceneProvider, { config, ref, ...canvasProps, children });
  }
);
Canvas.displayName = "Canvas";



exports.Canvas = Canvas;
