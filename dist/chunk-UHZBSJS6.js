import {
  useScene
} from "./chunk-Z3ENXIV3.js";

// src/hooks/usePlugin.ts
import { useEffect } from "react";
var usePlugin = (factory, deps = []) => {
  const orch = useScene();
  useEffect(() => {
    if (!orch) {
      return;
    }
    const plugin = orch.plugin(factory.name);
    if (!plugin) {
      orch.use(factory);
    }
    return () => {
      if (plugin) {
        plugin.dispose?.();
        orch.remove(factory.name);
      }
    };
  }, [orch, ...deps]);
  return orch.plugin(factory.name);
};

export {
  usePlugin
};
