import {
  GLTFLoader
} from "./chunk-AGRGG67J.js";

// src/react/components/ModelPreload.tsx
import { useEffect } from "react";
var ModelPreload = ({
  entries,
  draco = false,
  onProgress
}) => {
  useEffect(() => {
    GLTFLoader.preload(entries, { draco }, onProgress);
  }, [entries, draco, onProgress]);
  return null;
};

export {
  ModelPreload
};
