import {
  Suspense
} from "./chunk-RUDNMJTZ.js";
import {
  Model
} from "./chunk-K6IZVTKW.js";

// src/react/components/SuspenseModel.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var SuspenseModel = ({
  entry,
  draco,
  fallback = /* @__PURE__ */ jsxs("div", { className: "text-white", children: [
    "Loading model ",
    entry.id,
    "..."
  ] })
}) => {
  return /* @__PURE__ */ jsx(Suspense, { fallback, children: /* @__PURE__ */ jsx(Model, { entry, draco }) });
};

export {
  SuspenseModel
};
