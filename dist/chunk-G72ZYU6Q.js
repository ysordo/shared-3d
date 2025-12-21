import {
  usePreloadEffect
} from "./chunk-P57HK6EZ.js";
import {
  GLTFLoader
} from "./chunk-6FBDZUDJ.js";
import {
  useScene
} from "./chunk-J565G7BY.js";
import {
  useActiveModel
} from "./chunk-A4ADPOPR.js";

// src/react/components/Model.tsx
import { useRef } from "react";
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
  const cancelledRef = useRef(false);
  usePreloadEffect(
    (preload) => {
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
  if (!model || !children) {
    return null;
  }
  return children(model);
};

export {
  Model
};
