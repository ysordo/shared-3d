import {
  useScene
} from "./chunk-LMAPD2LC.js";

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const { activeModel } = useScene();
  return activeModel;
};

export {
  useActiveModel
};
