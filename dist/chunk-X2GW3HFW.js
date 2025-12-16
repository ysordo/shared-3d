import {
  Suspense
} from "./chunk-RUDNMJTZ.js";
import {
  Model
} from "./chunk-VN7BDQXI.js";

// src/react/components/SuspenseModel.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var SuspenseModel = ({
  entry,
  draco,
  fallback = /* @__PURE__ */ jsxs("div", { className: "text-white", children: [
    "Loading model ",
    entry.id,
    "..."
  ] }),
  children
}) => {
  return /* @__PURE__ */ jsx(Suspense, { fallback, children: /* @__PURE__ */ jsx(Model, { entry, draco, children: (model) => children?.(model) }) });
};

export {
  SuspenseModel
};
