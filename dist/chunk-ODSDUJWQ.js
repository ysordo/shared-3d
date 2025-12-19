import {
  useScene
} from "./chunk-Z3ENXIV3.js";

// src/hooks/usePlugin.ts
import { useEffect, useRef } from "react";
var usePlugin = (factory, deps = []) => {
  const orch = useScene();
  const plugin = useRef(factory);
  useEffect(() => {
    orch.use(plugin.current);
    return () => {
      if (plugin.current) {
        plugin.current.dispose?.();
        orch.remove(factory.name);
      }
    };
  }, deps);
  return plugin.current;
};

export {
  usePlugin
};
