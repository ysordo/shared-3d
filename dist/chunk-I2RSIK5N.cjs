"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkW2T32FMRcjs = require('./chunk-W2T32FMR.cjs');


var _chunkK56UA2A3cjs = require('./chunk-K56UA2A3.cjs');

// src/react/components/SuspenseModel.tsx
var _jsxruntime = require('react/jsx-runtime');
var SuspenseModel = ({
  entry,
  draco,
  fallback = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "text-white", children: [
    "Loading model ",
    entry.id,
    "..."
  ] })
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkW2T32FMRcjs.Suspense, { fallback, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkK56UA2A3cjs.Model, { entry, draco }) });
};



exports.SuspenseModel = SuspenseModel;
