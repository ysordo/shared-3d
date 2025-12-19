import {
  usePreload
} from "./chunk-WYULQMCG.js";

// src/hooks/usePreloadEffect.ts
import { useEffect } from "react";
var usePreloadEffect = (factory, deps = []) => {
  const preload = usePreload();
  useEffect(() => {
    factory(preload);
  }, [...deps]);
};

export {
  usePreloadEffect
};
