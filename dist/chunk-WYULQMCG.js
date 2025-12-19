import {
  useSceneContext
} from "./chunk-YYJ6TOBN.js";

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
