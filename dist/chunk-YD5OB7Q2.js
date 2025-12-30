import {
  usePlugin
} from "./chunk-M4U37VHK.js";
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
