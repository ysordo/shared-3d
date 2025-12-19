import {
  SceneProvider
} from "./chunk-7JBQSKEB.js";

// src/react/components/Canvas.tsx
import { forwardRef } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var Canvas = forwardRef(
  ({ config, children, fallback = null, ...props }, ref) => {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(SceneProvider, { ref, config, fallback, children: [
      /* @__PURE__ */ jsx("canvas", { ref, ...props }),
      children
    ] }) });
  }
);
Canvas.displayName = "Canvas";

export {
  Canvas
};
