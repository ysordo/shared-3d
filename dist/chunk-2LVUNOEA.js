import {
  usePreload
} from "./chunk-WC7QXUHU.js";

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
