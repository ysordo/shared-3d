import {
  AutoLODSystemPlugin
} from "./chunk-D4NGW2TQ.js";
import {
  useScene
} from "./chunk-KITXMCSG.js";

// src/react/components/AutoLODSystem.tsx
import { useEffect } from "react";
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100
}) => {
  const orchestrator = useScene();
  useEffect(() => {
    orchestrator.use(new AutoLODSystemPlugin({
      distances: [mediumDistance, lowDistance, hideDistance]
    }));
    return () => {
      orchestrator.plugin("AutoLODSystem").dispose?.();
    };
  }, [mediumDistance, lowDistance, hideDistance]);
  return null;
};

export {
  AutoLODSystem
};
