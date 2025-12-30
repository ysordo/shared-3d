import {
  useScene
} from "./chunk-R5SGHSIE.js";
import {
  RaycasterPlugin
} from "./chunk-VFXDH6LA.js";

// src/react/hooks/useRaycaster.ts
import { useEffect, useRef } from "react";
var useRaycaster = (onEvent) => {
  const orchestrator = useScene();
  const pluginRef = useRef(null);
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    if (pluginRef.current) {
      pluginRef.current.update({ onEvent });
      return;
    }
    const plugin = new RaycasterPlugin({ onEvent });
    pluginRef.current = plugin;
    orchestrator.plugin.use(plugin);
    return () => {
      if (pluginRef.current) {
        orchestrator.plugin.remove(plugin.name);
        pluginRef.current = null;
      }
    };
  }, [orchestrator, onEvent]);
};

export {
  useRaycaster
};
