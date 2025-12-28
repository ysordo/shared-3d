import {
  useScene
} from "./chunk-RUU4KTPM.js";

// src/hooks/useActiveModel.ts
import { useSyncExternalStore } from "react";
var useActiveModel = () => {
  const orchestrator = useScene();
  return useSyncExternalStore(
    (onChange) => {
      const loaded = () => onChange();
      const removed = () => onChange();
      orchestrator.addEventListener("model::loaded", loaded);
      orchestrator.addEventListener("model::removed", removed);
      return () => {
        orchestrator.removeEventListener("model::loaded", loaded);
        orchestrator.removeEventListener("model::removed", removed);
      };
    },
    () => orchestrator.getActiveModel()
  );
};

export {
  useActiveModel
};
