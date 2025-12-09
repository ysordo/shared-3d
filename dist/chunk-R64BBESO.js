import {
  useScene
} from "./chunk-DNUS32TF.js";

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = useScene();
  return orchestrator.getActiveModel();
};

export {
  useActiveModel
};
