"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3NXOKNYVcjs = require('./chunk-3NXOKNYV.cjs');

// src/react/components/Canvas.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var Canvas = ({
  config,
  children,
  ...canvasProps
}) => {
  const ref = _react.useRef.call(void 0, null);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "canvas", { ref, ...canvasProps }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunk3NXOKNYVcjs.SceneProvider, { ref, config, children })
  ] });
};
Canvas.displayName = "Canvas";



exports.Canvas = Canvas;
