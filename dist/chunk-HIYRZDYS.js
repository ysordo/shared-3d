import {
  useSceneContext
} from "./chunk-WE4FIT25.js";

// src/hooks/useActiveModel.ts
var useActiveModel = () => useSceneContext()?.activeModel ?? null;

export {
  useActiveModel
};
