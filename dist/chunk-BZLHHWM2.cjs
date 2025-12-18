"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkYCSYW7S3cjs = require('./chunk-YCSYW7S3.cjs');

// src/react/components/Canvas.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var Canvas = _react.forwardRef.call(void 0, 
  ({ config, children, ...canvasProps }, ref) => {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkYCSYW7S3cjs.SceneProvider, { config, ref, ...canvasProps, children });
  }
);
Canvas.displayName = "Canvas";



exports.Canvas = Canvas;
