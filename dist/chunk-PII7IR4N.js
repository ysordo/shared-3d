import {
  usePlugin
} from "./chunk-IF5HNNFI.js";
import {
  OrbitControlsPlugin
} from "./chunk-6ZE3RCVO.js";

// src/react/components/OrbitControls.tsx
var OrbitControls = () => {
  usePlugin("OrbitControls", () => new OrbitControlsPlugin(), []);
  return null;
};

export {
  OrbitControls
};
