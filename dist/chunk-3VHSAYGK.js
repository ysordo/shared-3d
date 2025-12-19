import {
  useSceneContext
} from "./chunk-T4B3VGYL.js";

// src/hooks/usePreload.ts
var usePreload = () => {
  const { preload } = useSceneContext();
  if (false) {
    const arr = [];
    preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return preload;
};

export {
  usePreload
};
