import {
  usePreload
} from "./chunk-C4FHCEML.js";

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
