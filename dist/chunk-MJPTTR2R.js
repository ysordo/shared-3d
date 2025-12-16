import {
  useScene
} from "./chunk-5BOYAQT3.js";
import {
  RaycasterPlugin
} from "./chunk-FBPG64NM.js";

// src/hooks/useRaycaster.ts
import { useEffect } from "react";
var useRaycaster = (onEvent) => {
  const orchestrator = useScene();
  useEffect(() => {
    const plugin = new RaycasterPlugin(onEvent);
    orchestrator.use(plugin);
    return () => {
    };
  }, [onEvent]);
};

export {
  useRaycaster
};
