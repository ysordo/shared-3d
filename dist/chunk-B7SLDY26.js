import {
  useSceneContext
} from "./chunk-VEIBNDEE.js";

// src/hooks/useActiveModel.ts
var useActiveModel = () => useSceneContext()?.activeModel ?? null;

export {
  useActiveModel
};
