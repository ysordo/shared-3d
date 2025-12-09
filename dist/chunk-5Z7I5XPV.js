import {
  SceneProvider
} from "./chunk-FUHGADU4.js";

// src/react/components/Canvas.tsx
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Canvas = forwardRef(
  ({ config, children, ...canvasProps }, ref) => {
    return /* @__PURE__ */ jsxs(SceneProvider, { ref, config, children: [
      /* @__PURE__ */ jsx("canvas", { ref, ...canvasProps }),
      children
    ] });
  }
);
Canvas.displayName = "Canvas";

export {
  Canvas
};
