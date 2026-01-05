import {
  usePlugin
} from "./chunk-VGY2SOT6.js";
import {
  UnrealEnginePostProcessingPlugin
} from "./chunk-VTJMMDW2.js";

// src/react/components/postprocessing/UnrealEnginePostProcessing.tsx
import { useCallback } from "react";
var UnrealEnginePostProcessing = () => {
  const factory = useCallback(() => new UnrealEnginePostProcessingPlugin(), []);
  usePlugin(factory, {});
  return null;
};

export {
  UnrealEnginePostProcessing
};
