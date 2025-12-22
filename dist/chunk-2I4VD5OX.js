import {
  useScene
} from "./chunk-B4MTQEJU.js";

// src/hooks/usePlugin.ts
import { useEffect } from "react";
var usePlugin = (factory, config, deps = []) => {
  const orchestrator = useScene();
  useEffect(() => {
    const temp = orchestrator.plugin((void 0).name);
    if (temp) {
      orchestrator.remove(temp?.name);
      temp?.dispose?.();
    }
    orchestrator.use(factory());
    return () => {
      if (temp) {
        orchestrator.remove(temp.name);
        temp.dispose?.();
      }
    };
  }, [orchestrator, factory]);
  useEffect(() => {
    const temp = orchestrator.plugin((void 0).name);
    if (!temp) {
      return;
    }
    if ("update" in temp) {
      temp.update?.(config);
    }
  }, [config, ...deps]);
  return orchestrator.plugin((void 0).name) ?? null;
};

export {
  usePlugin
};
