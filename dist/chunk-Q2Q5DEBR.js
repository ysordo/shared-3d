import {
  useScene
} from "./chunk-SNESV2BT.js";

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = useScene();
  return preload;
};

export {
  usePreload
};
