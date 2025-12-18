import {
  SceneProvider
} from "./chunk-NEKRA4I4.js";

// src/react/components/Canvas.tsx
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var Canvas = forwardRef(
  ({ config, children, ...canvasProps }, ref) => {
    return /* @__PURE__ */ jsx(SceneProvider, { config, ref, ...canvasProps, children });
  }
);
Canvas.displayName = "Canvas";

export {
  Canvas
};
