"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkK5365JNLcjs = require('./chunk-K5365JNL.cjs');

// src/react/components/Canvas.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var Canvas = _react.forwardRef.call(void 0, 
  ({ config, children, fallback = null, ...props }, ref) => {
    const internalRef = _react.useRef.call(void 0, null);
    const canvasRef = _nullishCoalesce(ref, () => ( internalRef));
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "canvas", { ref: canvasRef, ...props }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkK5365JNLcjs.SceneProvider, { ref: canvasRef, config, fallback, children })
    ] });
  }
);
Canvas.displayName = "Canvas";



exports.Canvas = Canvas;
