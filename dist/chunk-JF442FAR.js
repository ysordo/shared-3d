import {
  useScene
} from "./chunk-R5SGHSIE.js";

// src/react/hooks/usePlugin.ts
import { useEffect, useRef } from "react";
var usePlugin = (factory, config, deps = []) => {
  const orchestrator = useScene();
  const ref = useRef(void 0);
  useEffect(() => {
    if (ref.current) {
      ref.current?.dispose?.();
      orchestrator.plugin.remove(ref.current.name);
      ref.current = void 0;
    }
    const plugin = factory();
    ref.current = orchestrator.plugin.use(plugin);
    ref.current.update?.(config);
    return () => {
      if (ref.current) {
        ref.current?.dispose?.();
        orchestrator.plugin.remove(ref.current.name);
      }
      ref.current = void 0;
    };
  }, [orchestrator, factory]);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if ("update" in ref.current) {
      ref.current.update?.(config);
    }
  }, [config, ...deps]);
  return ref.current;
};

export {
  usePlugin
};
