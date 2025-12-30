import {
  SceneProvider
} from "./chunk-AARDPV3F.js";

// src/react/components/Canvas.tsx
import { forwardRef, useRef } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var Canvas = forwardRef(
  ({ config, children, ...props }, ref) => {
    const internalRef = useRef(null);
    const canvasRef = ref ?? internalRef;
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(SceneProvider, { ref: canvasRef, config, children: [
      /* @__PURE__ */ jsx("canvas", { ref: canvasRef, ...props }),
      children
    ] }) });
  }
);
Canvas.displayName = "Canvas";

export {
  Canvas
};
