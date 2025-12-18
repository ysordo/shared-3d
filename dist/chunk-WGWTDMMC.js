import {
  GLTFLoader
} from "./chunk-W33WFURU.js";
import {
  useScene
} from "./chunk-LLVELB32.js";
import {
  useActiveModel
} from "./chunk-X76ANPLO.js";

// src/react/components/Model.tsx
import { useEffect, useRef } from "react";
var Model = ({
  entry,
  draco = false,
  children,
  onLoaded,
  onProgress,
  onError
}) => {
  const orchestrator = useScene();
  const cancelledRef = useRef(false);
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    cancelledRef.current = false;
    GLTFLoader.load(entry, {
      draco,
      onLoaded: (obj, manifestEntry) => {
        if (cancelledRef.current) {
          return;
        }
        orchestrator.setModel(obj);
        onLoaded?.(obj, manifestEntry);
      },
      onProgress: (...args) => {
        if (cancelledRef.current) {
          return;
        }
        onProgress?.(...args);
      },
      onError: (...args) => {
        if (cancelledRef.current) {
          return;
        }
        onError?.(...args);
      }
    });
    return () => {
      cancelledRef.current = true;
      orchestrator.removeModel();
    };
  }, [entry.id, draco, orchestrator]);
  const model = useActiveModel();
  if (!model || !children) {
    return null;
  }
  return children(model);
};

export {
  Model
};
