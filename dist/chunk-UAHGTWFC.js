import {
  usePreload
} from "./chunk-X7V46YQV.js";
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
    const temp = entries.filter((value) => !preload.has(value.id));
    if (temp.length > 0) {
      GLTFLoader.preload(temp, { draco }, (...prev) => {
        preload.set(prev[1].id, prev[0]);
        onProgress?.(prev[2], prev[3], prev[1]);
      });
    }
  }, [entries, draco, onProgress]);
  return null;
};

export {
  ModelPreload
};
