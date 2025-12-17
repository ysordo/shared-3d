import {
  RaycasterPlugin
} from "./chunk-D6IH2BXA.js";
import {
  useScene
} from "./chunk-TYM6WY7X.js";

// src/hooks/useRaycaster.ts
import { useEffect, useRef } from "react";
var useRaycaster = (onEvent) => {
  const orchestrator = useScene();
  const pluginRef = useRef(null);
  useEffect(() => {
    if (pluginRef.current) {
      pluginRef.current.updateCallback(onEvent);
      return;
    }
    const plugin = new RaycasterPlugin(onEvent);
    pluginRef.current = plugin;
    orchestrator.use(plugin);
    return () => {
      if (pluginRef.current) {
        orchestrator.remove(plugin.name);
        pluginRef.current = null;
      }
    };
  }, [orchestrator, onEvent]);
};

export {
  useRaycaster
};
