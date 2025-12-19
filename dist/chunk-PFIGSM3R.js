import {
  useSceneContext
} from "./chunk-57VGNGNI.js";

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
