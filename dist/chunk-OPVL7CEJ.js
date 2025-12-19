import {
  usePlugin
} from "./chunk-BMLZOBEX.js";
import {
  OrbitControlsPlugin
} from "./chunk-6ZE3RCVO.js";

// src/react/components/OrbitControls.tsx
var OrbitControls = () => {
  usePlugin(() => new OrbitControlsPlugin(), []);
  return null;
};

export {
  OrbitControls
};
