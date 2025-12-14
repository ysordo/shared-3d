import {
  useScene
} from "./chunk-N2Q7PBDH.js";

// src/react/components/HDRI.tsx
import { useCallback, useEffect } from "react";
var HDRI = ({
  entry,
  config = {},
  onLoaded,
  onProgress,
  onError
}) => {
  const orchestrator = useScene();
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
    if (!orchestrator || !orchestrator.addEventListener) {
      return;
    }
    orchestrator.addEventListener("hdri::loaded", handleHDRIEvent);
    orchestrator.addEventListener("hdri::progress", handleHDRIEvent);
    orchestrator.addEventListener("hdri::error", handleHDRIEvent);
    orchestrator.setHDRI(entry, config).catch(console.error);
    return () => {
      orchestrator.removeEventListener("hdri::loaded", handleHDRIEvent);
      orchestrator.removeEventListener("hdri::progress", handleHDRIEvent);
      orchestrator.removeEventListener("hdri::error", handleHDRIEvent);
      if (orchestrator.clearHDRI) {
        orchestrator.clearHDRI();
      }
    };
  }, [orchestrator, entry.id, handleHDRIEvent, config]);
  return null;
};

export {
  HDRI
};
