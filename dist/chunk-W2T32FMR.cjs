"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/react/components/Suspense.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var Suspense = ({
  children,
  fallback,
  loadingMessage = "Loading 3D model..."
}) => {
  const defaultFallback = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50", children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "bg-gray-900/90 border border-gray-700 rounded-xl p-8 shadow-2xl text-center", children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-xl font-semibold text-white", children: loadingMessage }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-sm text-gray-400 mt-2", children: "This may take a few seconds..." })
  ] }) });
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _react.Suspense, { fallback: fallback || defaultFallback, children });
};



exports.Suspense = Suspense;
