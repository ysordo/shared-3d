import {
  useScene
} from "./chunk-KITXMCSG.js";

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = useScene();
  return orchestrator.getActiveModel();
};

export {
  useActiveModel
};
