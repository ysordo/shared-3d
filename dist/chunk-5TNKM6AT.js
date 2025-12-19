import {
  usePreloadEffect
} from "./chunk-QL3VMQYQ.js";
import {
  GLTFLoader
} from "./chunk-SPHPB7FK.js";

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
    GLTFLoader.preload(data.entries, { draco: data.draco }, (...prev) => {
      preload.set(prev[1].id, prev[0]);
      onProgress?.(prev[2], prev[3]);
    });
  }, deps);
  return null;
};

export {
  ModelPreload
};
