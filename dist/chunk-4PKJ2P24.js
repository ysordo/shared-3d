import {
  SceneProvider
} from "./chunk-ZZANWZBJ.js";

// src/react/components/Canvas.tsx
import { forwardRef, useRef } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var Canvas = forwardRef(
  ({ config, children, ...props }, ref) => {
    const internalRef = useRef(null);
    const canvasRef = ref ?? internalRef;
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("canvas", { ref: canvasRef, ...props }),
      /* @__PURE__ */ jsx(SceneProvider, { canvasRef, config, children })
    ] });
  }
);
Canvas.displayName = "Canvas";

export {
  Canvas
};
