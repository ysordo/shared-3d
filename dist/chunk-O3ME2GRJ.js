import {
  useScene
} from "./chunk-5BOYAQT3.js";

// src/react/components/Model.tsx
import { useEffect, useState } from "react";
var Model = ({
  entry,
  draco = false,
  onLoaded,
  onProgress,
  onError,
  children
}) => {
  const orchestrator = useScene();
  const [model, setModel] = useState(null);
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    let cancelled = false;
    orchestrator.setModel(entry, {
      draco,
      onLoaded: (...prev) => {
        if (cancelled) {
          return;
        }
        setModel(prev[0]);
        onLoaded?.(...prev);
      },
      onProgress: (...prev) => {
        if (cancelled) {
          return;
        }
        onProgress?.(...prev);
      },
      onError: (...prev) => {
        if (cancelled) {
          return;
        }
        onError?.(...prev);
      }
    });
    return () => {
      cancelled = true;
      setModel(null);
      orchestrator.removeModel();
    };
  }, [entry.id, draco, orchestrator, entry]);
  if (!model) {
    return null;
  }
  return children?.(model);
};

export {
  Model
};
