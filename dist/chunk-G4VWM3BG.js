import {
  usePlugin
} from "./chunk-I3ICZD4F.js";
import {
  OrbitControlsPlugin
} from "./chunk-WQS6CQ5N.js";

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
