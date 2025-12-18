import {
  usePreload
} from "./chunk-VAWS73LP.js";

// src/hooks/usePreloadEffect.ts
import { useEffect } from "react";
var usePreloadEffect = (factory, deps = []) => {
  const preload = usePreload();
  useEffect(() => {
    if (!preload) {
      return;
    }
    factory(preload);
  }, [...deps]);
};

export {
  usePreloadEffect
};
