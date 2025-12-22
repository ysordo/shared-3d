import {
  useScene
} from "./chunk-MIPC6IJZ.js";

// src/hooks/usePlugin.ts
import { useEffect, useRef } from "react";
var usePlugin = (factory, config, deps = []) => {
  const orchestrator = useScene();
  const pluginRef = useRef(null);
  useEffect(() => {
    if (pluginRef.current) {
      orchestrator.remove(pluginRef.current.name);
      pluginRef.current.dispose?.();
    }
    const plugin = factory();
    pluginRef.current = plugin;
    orchestrator.use(plugin);
    return () => {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
    };
  }, [orchestrator, factory]);
  useEffect(() => {
    if (!pluginRef.current) {
      return;
    }
    if ("update" in pluginRef.current) {
      pluginRef.current.update?.(config);
    }
  }, [config, ...deps]);
  return pluginRef.current;
};

export {
  usePlugin
};
