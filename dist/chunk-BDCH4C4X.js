import {
  useScene
} from "./chunk-DWHU2W2T.js";

// src/hooks/usePlugin.ts
import { useEffect, useRef } from "react";
var usePlugin = (factory, deps = [], enabled = true) => {
  const orchestrator = useScene();
  const pluginRef = useRef(null);
  useEffect(() => {
    if (!enabled) {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
      return;
    }
    if (pluginRef.current) {
      orchestrator.remove(pluginRef.current.name);
      pluginRef.current.dispose?.();
    }
    const plugin = factory();
    if (!plugin) {
      return;
    }
    pluginRef.current = plugin;
    orchestrator.use(plugin);
    return () => {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
    };
  }, [orchestrator, enabled, factory, ...deps]);
  return pluginRef.current;
};

export {
  usePlugin
};
