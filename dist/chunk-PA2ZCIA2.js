import {
  useScene
} from "./chunk-Z3ENXIV3.js";

// src/hooks/usePlugin.ts
import { useEffect, useRef } from "react";
var usePlugin = (factory, deps = []) => {
  const orchestrator = useScene();
  const pluginRef = useRef(null);
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    if (!pluginRef.current) {
      pluginRef.current = factory();
      orchestrator.use(pluginRef.current);
    }
    return () => {
      if (pluginRef.current) {
        const name = pluginRef.current.name;
        orchestrator.remove(name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
    };
  }, [orchestrator, ...deps]);
  return pluginRef.current ? orchestrator.plugin(pluginRef.current.name) : void 0;
};

export {
  usePlugin
};
