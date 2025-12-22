import {
  usePlugin
} from "./chunk-2I4VD5OX.js";
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
