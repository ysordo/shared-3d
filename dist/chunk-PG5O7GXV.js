import {
  useSceneContext
} from "./chunk-37SGICUP.js";

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
