"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkL6YAM3ECcjs = require('./chunk-L6YAM3EC.cjs');

// src/react/components/Canvas.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var Canvas = _react.forwardRef.call(void 0, 
  ({ config, children, fallback = null, ...props }, ref) => {
    const internalRef = _react.useRef.call(void 0, null);
    const canvasRef = _nullishCoalesce(ref, () => ( internalRef));
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _chunkL6YAM3ECcjs.SceneProvider, { ref: canvasRef, config, fallback, children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "canvas", { ref: canvasRef, ...props }),
      children
    ] }) });
  }
);
Canvas.displayName = "Canvas";



exports.Canvas = Canvas;
