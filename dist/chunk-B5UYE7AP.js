import {
  useSceneContext
} from "./chunk-3N37SJIR.js";

// src/hooks/usePreloadEffect.ts
import { useEffect } from "react";
var usePreloadEffect = (factory, deps = []) => {
  const preload = useSceneContext().preload;
  useEffect(() => {
    factory(preload);
  }, [...deps]);
};

export {
  usePreloadEffect
};
