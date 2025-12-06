import {
  AutoLODSystemPlugin
} from "./chunk-D4NGW2TQ.js";
import {
  useScene
} from "./chunk-CSZ3E2ZE.js";

// src/react/components/AutoLODSystem.tsx
import { useEffect } from "react";
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100
}) => {
  const orchestrator = useScene();
  useEffect(() => {
    const plugin = new AutoLODSystemPlugin({
      distances: [mediumDistance, lowDistance, hideDistance]
    });
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [mediumDistance, lowDistance, hideDistance]);
  return null;
};

export {
  AutoLODSystem
};
