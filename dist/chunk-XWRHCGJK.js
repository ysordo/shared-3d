import {
  SceneProvider
} from "./chunk-PEPBYU36.js";

// src/react/components/Canvas.tsx
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var Canvas = forwardRef(
  ({ config, children, ...canvasProps }, ref) => {
    return /* @__PURE__ */ jsx(SceneProvider, { config, canvasRef: ref, children });
  }
);
Canvas.displayName = "Canvas";

export {
  Canvas
};
