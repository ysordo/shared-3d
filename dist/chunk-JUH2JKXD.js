import {
  usePreload
} from "./chunk-X7V46YQV.js";
import {
  useScene
} from "./chunk-LT5F3BLV.js";

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
  const preload = usePreload();
  const [model, setModel] = useState(null);
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    let cancelled = false;
    let template = entry;
    const temp = preload.get(entry.id);
    if (temp) {
      template = {
        obj: temp,
        manifest: entry
      };
    }
    orchestrator.setModel(template, {
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
