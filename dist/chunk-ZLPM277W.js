import {
  LODSystemPlugin
} from "./chunk-HVXJUMVE.js";
import {
  useScene
} from "./chunk-DNUS32TF.js";

// src/react/components/LODSystem.tsx
import { useEffect } from "react";
var LODSystem = ({
  levels,
  hysteresis = 0.1
}) => {
  const orchestrator = useScene();
  useEffect(() => {
    const plugin = new LODSystemPlugin([{ levels, hysteresis }]);
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [levels, hysteresis]);
  return null;
};

export {
  LODSystem
};
