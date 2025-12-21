import {
  usePreload
} from "./chunk-UCMOYOG4.js";

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
