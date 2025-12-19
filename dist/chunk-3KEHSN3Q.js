import {
  SceneProvider
} from "./chunk-P3WYESLQ.js";

// src/react/components/Canvas.tsx
import { forwardRef, useRef } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var Canvas = forwardRef(
  ({ config, children, fallback = null, ...props }, ref) => {
    const internalRef = useRef(null);
    const canvasRef = ref ?? internalRef;
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("canvas", { ref: canvasRef, ...props }),
      /* @__PURE__ */ jsx(SceneProvider, { ref: canvasRef, config, fallback, children })
    ] });
  }
);
Canvas.displayName = "Canvas";

export {
  Canvas
};
