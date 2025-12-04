import {
  useScene
} from "./chunk-MAMG6W2Y.js";

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = useScene();
  return orchestrator.getActiveModel();
};

export {
  useActiveModel
};
