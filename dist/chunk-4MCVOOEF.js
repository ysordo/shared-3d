import {
  SceneProvider
} from "./chunk-ZHSOSDPU.js";

// src/react/components/Canvas.tsx
import { useRef } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var Canvas = ({
  config,
  children,
  ...canvasProps
}) => {
  const ref = useRef(null);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("canvas", { ref, ...canvasProps }),
    /* @__PURE__ */ jsx(SceneProvider, { ref, config, children })
  ] });
};
Canvas.displayName = "Canvas";

export {
  Canvas
};
