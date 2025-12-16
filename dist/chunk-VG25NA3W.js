import {
  usePreload
} from "./chunk-Q2Q5DEBR.js";
import {
  useScene
} from "./chunk-DISUKCJK.js";
import {
  useActiveModel
} from "./chunk-HB4RZM2W.js";

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
  const activeModel = useActiveModel();
  const preload = usePreload();
  const [model, setModel] = useState(null);
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    if (activeModel && activeModel.name == entry.id) {
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
  }, [entry.id, draco, orchestrator]);
  if (!model) {
    return null;
  }
  return children?.(model);
};

export {
  Model
};
