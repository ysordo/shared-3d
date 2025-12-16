import {
  usePreload
} from "./chunk-JSDJ2SIW.js";
import {
  GLTFLoader
} from "./chunk-W33WFURU.js";

// src/react/components/ModelPreload.tsx
import { useEffect } from "react";
var ModelPreload = ({
  entries,
  draco = false,
  onProgress
}) => {
  const preload = usePreload();
  useEffect(() => {
    GLTFLoader.preload(entries, { draco }, (...prev) => {
      preload.set(prev[1].id, prev[0]);
      onProgress?.(prev[2], prev[3]);
    });
  }, [entries, draco, onProgress]);
  return null;
};

export {
  ModelPreload
};
