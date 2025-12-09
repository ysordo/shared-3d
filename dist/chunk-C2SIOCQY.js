import {
  RaycasterPlugin
} from "./chunk-FBPG64NM.js";
import {
  useScene
} from "./chunk-43RFP7TS.js";

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
