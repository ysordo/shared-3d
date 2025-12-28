import {
  useScene
} from "./chunk-J5USS2N5.js";

// src/hooks/usePlugin.ts
import { useEffect, useRef } from "react";
var usePlugin = (factory, config, deps = []) => {
  const orchestrator = useScene();
  const ref = useRef(void 0);
  useEffect(() => {
    if (ref.current) {
      ref.current?.dispose?.();
      orchestrator.remove(ref.current.name);
      ref.current = void 0;
    }
    const plugin = factory();
    ref.current = orchestrator.use(plugin);
    ref.current.update?.(config);
    return () => {
      if (ref.current) {
        ref.current?.dispose?.();
        orchestrator.remove(ref.current.name);
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
