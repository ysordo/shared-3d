import {
  useSceneContext
} from "./chunk-VEHB7RU2.js";

// src/hooks/usePreload.ts
var usePreload = () => {
  const preload = useSceneContext().preload;
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
