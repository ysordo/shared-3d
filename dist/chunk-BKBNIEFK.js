import {
  useScene
} from "./chunk-DWHU2W2T.js";

// src/hooks/usePlugin.ts
import { useEffect, useRef } from "react";
var usePlugin = (factory, deps = []) => {
  const orchestrator = useScene();
  const pluginRef = useRef(null);
  const prevDepsRef = useRef(null);
  useEffect(() => {
    if (!factory) {
      return;
    }
    if (pluginRef.current) {
      const name = pluginRef.current.name;
      orchestrator.remove(name);
      pluginRef.current.dispose?.();
      pluginRef.current = null;
    }
    const newPlugin = factory;
    pluginRef.current = newPlugin;
    orchestrator.use(newPlugin);
    prevDepsRef.current = deps;
    return () => {
      if (pluginRef.current) {
        const name = pluginRef.current.name;
        orchestrator.remove(name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
    };
  }, [orchestrator, factory, ...deps]);
  return pluginRef.current;
};

export {
  usePlugin
};
