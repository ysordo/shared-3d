import {
  useScene
} from "./chunk-B4MTQEJU.js";

// src/hooks/usePlugin.ts
import { useEffect, useState } from "react";
var usePlugin = (factory, config, deps = []) => {
  const orchestrator = useScene();
  const [name, setName] = useState("");
  useEffect(() => {
    if (orchestrator.has(name)) {
      orchestrator.plugin(name)?.dispose?.();
      orchestrator.remove(name);
    }
    const plugin = factory();
    setName(plugin.name);
    orchestrator.use(plugin);
    return () => {
      if (orchestrator.has(name)) {
        orchestrator.plugin(name)?.dispose?.();
        orchestrator.remove(name);
      }
      setName("");
    };
  }, [orchestrator, factory]);
  useEffect(() => {
    if (!orchestrator.has(name)) {
      return;
    }
    const temp = orchestrator.plugin(name);
    if ("update" in temp) {
      temp.update?.(config);
    }
  }, [config, ...deps]);
  return orchestrator.plugin(name);
};

export {
  usePlugin
};
