import {
  useScene
} from "./chunk-MJH7XTAB.js";

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = useScene();
  return orchestrator.getActiveModel();
};

export {
  useActiveModel
};
