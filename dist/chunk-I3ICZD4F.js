import {
  useScene
} from "./chunk-J565G7BY.js";

// src/hooks/usePlugin.ts
import { useEffect, useRef } from "react";
function shallowDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    const valA = a[key];
    const valB = b[key];
    if (Array.isArray(valA) && Array.isArray(valB)) {
      if (valA.length !== valB.length) {
        return false;
      }
      for (let i = 0; i < valA.length; i++) {
        if (valA[i] !== valB[i]) {
          return false;
        }
      }
    } else if (valA && typeof valA === "object" && valB && typeof valB === "object") {
      if (!shallowDeepEqual(valA, valB)) {
        return false;
      }
    } else if (valA !== valB) {
      return false;
    }
  }
  return true;
}
var usePlugin = (factory, config, deps = []) => {
  const orchestrator = useScene();
  const pluginRef = useRef(null);
  const prevConfigRef = useRef(null);
  useEffect(() => {
    const shouldRecreate = !shallowDeepEqual(prevConfigRef.current, config);
    if (shouldRecreate) {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
      }
      const newPlugin = factory();
      pluginRef.current = newPlugin;
      orchestrator.use(newPlugin);
      prevConfigRef.current = config;
    } else if (pluginRef.current && "update" in pluginRef.current) {
      pluginRef.current.update?.(config);
    }
    return () => {
      if (pluginRef.current) {
        orchestrator.remove(pluginRef.current.name);
        pluginRef.current.dispose?.();
        pluginRef.current = null;
      }
    };
  }, [orchestrator, config, ...deps]);
  return pluginRef.current;
};

export {
  usePlugin
};
