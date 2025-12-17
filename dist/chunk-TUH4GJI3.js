import {
  usePreloadEffect
} from "./chunk-B5UYE7AP.js";
import {
  GLTFLoader
} from "./chunk-W33WFURU.js";

// src/react/components/ModelPreload.tsx
import { useMemo } from "react";
var ModelPreload = ({
  entries,
  draco = false,
  onProgress
}) => {
  const data = useMemo(
    () => ({ entries, draco, onProgress }),
    [entries, draco, onProgress]
  );
  usePreloadEffect((preload) => {
    GLTFLoader.preload(data.entries, { draco: data.draco }, (...prev) => {
      preload.set(prev[1].id, prev[0]);
      onProgress?.(prev[2], prev[3]);
    });
  }, [Object.values(data)]);
  return null;
};

export {
  ModelPreload
};
