import {
  useScene
} from "./chunk-SNESV2BT.js";

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const { activeModel } = useScene();
  return activeModel;
};

export {
  useActiveModel
};
