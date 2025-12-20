import {
  usePreloadEffect
} from "./chunk-QL3VMQYQ.js";
import {
  GLTFLoader
} from "./chunk-6FBDZUDJ.js";

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
  const deps = useMemo(
    () => [...Object.values(data)],
    [...Object.values(data)]
  );
  usePreloadEffect((preload) => {
    GLTFLoader.preload(
      data.entries,
      { draco: data.draco },
      (obj, { id }, completed, total, percent) => {
        if (obj) {
          preload.set(id, obj);
        }
        onProgress?.(id, completed, total, percent);
      }
    );
  }, deps);
  return null;
};

export {
  ModelPreload
};
