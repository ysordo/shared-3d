"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkW2T32FMRcjs = require('./chunk-W2T32FMR.cjs');


var _chunk6CCTXIMZcjs = require('./chunk-6CCTXIMZ.cjs');

// src/react/components/SuspenseModel.tsx
var _jsxruntime = require('react/jsx-runtime');
var SuspenseModel = ({
  entry,
  draco,
  fallback = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "text-white", children: [
    "Loading model ",
    entry.id,
    "..."
  ] }),
  children
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkW2T32FMRcjs.Suspense, { fallback, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunk6CCTXIMZcjs.Model, { entry, draco, children: (model) => _optionalChain([children, 'optionalCall', _ => _(model)]) }) });
};



exports.SuspenseModel = SuspenseModel;
