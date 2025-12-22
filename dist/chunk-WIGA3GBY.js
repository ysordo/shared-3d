import {
  OrbitControlsPlugin
} from "./chunk-WQS6CQ5N.js";
import {
  usePlugin
} from "./chunk-FA2SQMD7.js";

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
