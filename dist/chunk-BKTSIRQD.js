import {
  useScene
} from "./chunk-Z3ENXIV3.js";

// src/react/components/HDRI.tsx
import { useCallback, useEffect, useRef } from "react";
var HDRI = ({
  entry,
  config = {},
  onLoaded,
  onProgress,
  onError
}) => {
  const orchestrator = useScene();
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
      orchestrator.addEventListener(
        "hdri::loaded",
        handleHDRIEvent
      );
      orchestrator.addEventListener(
        "hdri::progress",
        handleHDRIEvent
      );
      orchestrator.addEventListener(
        "hdri::error",
        handleHDRIEvent
      );
      isHandle.current = true;
    }
    if (isHandle.current) {
      if (orchestrator.getActiveHDRI()?.name !== entry.id && !isloaded.current) {
        isloaded.current = false;
        orchestrator.setHDRI(entry, config).catch(console.error);
      }
    }
    return () => {
      isHandle.current = false;
      orchestrator.removeEventListener(
        "hdri::loaded",
        handleHDRIEvent
      );
      orchestrator.removeEventListener(
        "hdri::progress",
        handleHDRIEvent
      );
      orchestrator.removeEventListener(
        "hdri::error",
        handleHDRIEvent
      );
      orchestrator.clearHDRI();
      isloaded.current = false;
    };
  }, [config, entry.id, handleHDRIEvent, orchestrator]);
  return null;
};

export {
  HDRI
};
