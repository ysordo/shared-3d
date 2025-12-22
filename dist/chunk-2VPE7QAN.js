import {
  useScene
} from "./chunk-B4MTQEJU.js";

// src/hooks/usePlugin.ts
import { useEffect } from "react";
var usePlugin = (factory, config, deps = []) => {
  const orchestrator = useScene();
  useEffect(() => {
    const temp = orchestrator.plugin(void 0);
    if (temp) {
      orchestrator.remove(temp?.name);
      temp?.dispose?.();
    }
    orchestrator.use(factory());
    return () => {
      const plugin = orchestrator.plugin(void 0);
      if (plugin) {
        orchestrator.remove(plugin.name);
        plugin.dispose?.();
      }
    };
  }, [orchestrator, factory]);
  useEffect(() => {
    const temp = orchestrator.plugin(void 0);
    if (!temp) {
      return;
    }
    if ("update" in temp) {
      temp.update?.(config);
    }
  }, [config, ...deps]);
  return orchestrator.plugin(void 0) ?? null;
};

export {
  usePlugin
};
