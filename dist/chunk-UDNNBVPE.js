import {
  useScene
} from "./chunk-DY5FMGAB.js";

// src/react/components/HDRI.tsx
import { useCallback, useEffect, useRef } from "react";
var HDRI = ({
  entry,
  exposure = 1,
  maxLuminance = 16,
  onLoaded,
  onProgress,
  onError
}) => {
  const orch = useScene();
  const isHandle = useRef(false);
  const isloaded = useRef(false);
  const handleHDRIEvent = useCallback(
    (event) => {
      if (event.entry?.id !== entry.id) {
        return;
      }
      switch (event.type) {
        case "hdri::loaded":
          onLoaded?.({
            texture: event.texture,
            entry: event.entry,
            config: event.config
          });
          break;
        case "hdri::progress":
          onProgress?.({
            progress: event.progress,
            entry: event.entry
          });
          isloaded.current = true;
          break;
        case "hdri::error":
          onError?.({
            error: event.error,
            entry: event.entry
          });
          break;
      }
    },
    [entry.id, onLoaded, onProgress, onError]
  );
  useEffect(() => {
    if (!isHandle.current) {
      orch.addEventListener(
        "hdri::loaded",
        handleHDRIEvent
      );
      orch.addEventListener(
        "hdri::progress",
        handleHDRIEvent
      );
      orch.addEventListener(
        "hdri::error",
        handleHDRIEvent
      );
      isHandle.current = true;
    }
    if (isHandle.current) {
      if (orch.getActiveHDRI()?.name !== entry.id && !isloaded.current) {
        isloaded.current = false;
        orch.setHDRI(entry, { exposure, maxLuminance }).catch(console.error);
      }
    }
    return () => {
      isHandle.current = false;
      orch.removeEventListener(
        "hdri::loaded",
        handleHDRIEvent
      );
      orch.removeEventListener(
        "hdri::progress",
        handleHDRIEvent
      );
      orch.removeEventListener(
        "hdri::error",
        handleHDRIEvent
      );
      orch.clearHDRI();
      isloaded.current = false;
    };
  }, [entry.id, exposure, handleHDRIEvent, maxLuminance, orch]);
  return null;
};

export {
  HDRI
};
