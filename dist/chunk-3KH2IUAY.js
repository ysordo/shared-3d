import {
  useScene
} from "./chunk-DWHU2W2T.js";

// src/hooks/usePlugin.ts
import { useEffect, useRef } from "react";
var usePlugin = (factory, deps = []) => {
  const orchestrator = useScene();
  const pluginRef = useRef(null);
  useEffect(() => {
    if (pluginRef.current && orchestrator.has(pluginRef.current.name)) {
      return;
    }
    if (pluginRef.current) {
      orchestrator.remove(pluginRef.current.name);
      pluginRef.current.dispose?.();
    }
    const plugin = factory();
    pluginRef.current = plugin;
    if (orchestrator.has(plugin.name)) {
      console.warn(`[usePlugin] Plugin "${plugin.name}" ya existe. Sobrescribiendo.`);
      orchestrator.remove(plugin.name);
    }
    orchestrator.use(plugin);
    return () => {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
    };
  }, [orchestrator, ...deps]);
  return pluginRef.current;
};

export {
  usePlugin
};
