import {
  useScene
} from "./chunk-Z3ENXIV3.js";

// src/hooks/usePlugin.ts
import { useEffect } from "react";
var usePlugin = (name, factory, deps = []) => {
  const orch = useScene();
  useEffect(() => {
    if (!orch) {
      return;
    }
    const plugin = orch.plugin(name);
    if (!plugin) {
      orch.use(factory());
    }
    return () => {
      if (plugin) {
        plugin.dispose?.();
        orch.remove(name);
      }
    };
  }, [orch, ...deps]);
  return orch.plugin(name);
};

export {
  usePlugin
};
