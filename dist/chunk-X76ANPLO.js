import {
  useSceneContext
} from "./chunk-NEKRA4I4.js";

// src/hooks/useActiveModel.ts
var useActiveModel = () => useSceneContext()?.activeModel ?? null;

export {
  useActiveModel
};
