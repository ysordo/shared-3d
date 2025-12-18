import {
  useSceneContext
} from "./chunk-WE4FIT25.js";

// src/hooks/usePreload.ts
var usePreload = () => {
  const orchestrator = useSceneContext();
  if (!orchestrator) {
    return null;
  }
  if (false) {
    const arr = [];
    orchestrator.preload.forEach((model, key) => arr.push({ key, model }));
    return arr;
  }
  return orchestrator.preload;
};

export {
  usePreload
};
