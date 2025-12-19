"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkEVCS33DHcjs = require('./chunk-EVCS33DH.cjs');

// src/react/components/Canvas.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var Canvas = _react.forwardRef.call(void 0, 
  ({ config, children, fallback = null, ...props }, ref) => {
    const internalRef = _react.useRef.call(void 0, null);
    const canvasRef = _nullishCoalesce(ref, () => ( internalRef));
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _chunkEVCS33DHcjs.SceneProvider,
      {
        ref: canvasRef,
        config,
        Canvas: (props2) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "canvas", { ref: canvasRef, ...props2 }),
        fallback,
        children
      }
    ) });
  }
);
Canvas.displayName = "Canvas";



exports.Canvas = Canvas;
