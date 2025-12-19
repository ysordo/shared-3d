"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkIHOCFYQZcjs = require('./chunk-IHOCFYQZ.cjs');

// src/react/components/Canvas.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var Canvas = _react.forwardRef.call(void 0, 
  ({ config, children, fallback = null, ...props }, ref) => {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _chunkIHOCFYQZcjs.SceneProvider, { ref, config, fallback, children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "canvas", { ref, ...props }),
      children
    ] }) });
  }
);
Canvas.displayName = "Canvas";



exports.Canvas = Canvas;
