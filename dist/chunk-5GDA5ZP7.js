import {
  useScene
} from "./chunk-YXZQN2XJ.js";

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = useScene();
  return orchestrator.getActiveModel();
};

export {
  useActiveModel
};
