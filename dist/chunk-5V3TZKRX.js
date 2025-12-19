import {
  SceneProvider
} from "./chunk-YE7II2FU.js";

// src/react/components/Canvas.tsx
import { forwardRef, useRef } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var Canvas = forwardRef(
  ({ config, children, fallback = null, ...props }, ref) => {
    const internalRef = useRef(null);
    const canvasRef = ref ?? internalRef;
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
      SceneProvider,
      {
        ref: canvasRef,
        config,
        Canvas: forwardRef((props1, ref2) => /* @__PURE__ */ jsx("canvas", { ref: ref2, ...props1, ...props })),
        fallback,
        children
      }
    ) });
  }
);
Canvas.displayName = "Canvas";

export {
  Canvas
};
