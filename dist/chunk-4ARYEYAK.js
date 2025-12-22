import {
  usePreload
} from "./chunk-4LIJI5FW.js";
import {
  GLTFLoader
} from "./chunk-6FBDZUDJ.js";
import {
  useScene
} from "./chunk-MIPC6IJZ.js";
import {
  useActiveModel
} from "./chunk-QXJVNBHV.js";

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
  const model = useActiveModel();
  const preload = usePreload();
  const cancelledRef = useRef(false);
  useEffect(
    () => {
      if (!model || entry.id !== model.name) {
        cancelledRef.current = false;
        const t = preload.get(entry.id);
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
            preload.set(manifestEntry.id, obj);
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
  if (!model) {
    return null;
  }
  return children?.(model);
};

export {
  Model
};
