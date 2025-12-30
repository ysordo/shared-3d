import {
  usePlugin
} from "./chunk-LRTR63O6.js";
import {
  OrbitControlsPlugin
} from "./chunk-RQB2RLAY.js";

// src/react/components/OrbitControls.tsx
var OrbitControls = () => {
  const config = {};
  const factory = () => new OrbitControlsPlugin();
  usePlugin(factory, config);
  return null;
};

export {
  OrbitControls
};
