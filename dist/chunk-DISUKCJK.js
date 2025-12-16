import {
  useScene
} from "./chunk-SNESV2BT.js";

// src/hooks/useScene.ts
var useScene2 = () => {
  const { orchestrator } = useScene();
  return orchestrator;
};

export {
  useScene2 as useScene
};
