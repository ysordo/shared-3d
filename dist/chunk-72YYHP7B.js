import {
  usePlugin
} from "./chunk-BDCH4C4X.js";
import {
  OrbitControlsPlugin
} from "./chunk-6ZE3RCVO.js";

// src/react/components/OrbitControls.tsx
import { useCallback } from "react";
var OrbitControls = () => {
  const factory = useCallback(() => new OrbitControlsPlugin(), []);
  usePlugin(factory, [factory]);
  return null;
};

export {
  OrbitControls
};
