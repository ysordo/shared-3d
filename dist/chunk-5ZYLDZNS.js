import {
  GLTFLoader
} from "./chunk-6FBDZUDJ.js";
import {
  useActiveModel
} from "./chunk-JY7NWOQT.js";
import {
  usePreload,
  useScene
} from "./chunk-RUU4KTPM.js";

// src/react/components/Model.tsx
import { useEffect, useRef } from "react";
var Model = ({
  entry,
  draco = false,
  onLoaded,
  onProgress,
  onError
}) => {
  const orchestrator = useScene();
  const model = useActiveModel();
  const { preloadModel, getPreloaded } = usePreload();
  const cancelledRef = useRef(false);
  useEffect(
    () => {
      if (!model || entry.id !== model.name) {
        cancelledRef.current = false;
        const t = getPreloaded(entry.id);
        if (t) {
          if (cancelledRef.current) {
            return;
          }
          orchestrator.setModel(t);
          onLoaded?.(t, entry);
          return;
        }
        GLTFLoader.load(entry, {
          draco,
          onLoaded: (obj, manifestEntry) => {
            if (cancelledRef.current) {
              return;
            }
            preloadModel(manifestEntry.id, obj);
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
      }
      return () => {
        cancelledRef.current = true;
        orchestrator.removeModel();
      };
    },
    [entry.id, draco, orchestrator, onLoaded, onProgress, onError, model]
  );
  return null;
};

export {
  Model
};
