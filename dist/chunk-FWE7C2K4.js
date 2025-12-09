import {
  AutoLODSystemPlugin
} from "./chunk-NWBFTWAT.js";
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
    if (!orchestrator) {
      return;
    }
    if (orchestrator.has("AutoLODSystem")) {
      return;
    }
    orchestrator.use(
      new AutoLODSystemPlugin({
        distances: [mediumDistance, lowDistance, hideDistance]
      })
    );
    return () => {
      orchestrator.plugin("AutoLODSystem").dispose?.();
      orchestrator.remove("AutoLODSystem");
    };
  }, [orchestrator]);
  useEffect(() => {
    if (orchestrator.has("AutoLODSystem")) {
      orchestrator.remove("AutoLODSystem");
    }
    orchestrator.use(
      new AutoLODSystemPlugin({
        distances: [mediumDistance, lowDistance, hideDistance]
      })
    );
  }, [mediumDistance, lowDistance, hideDistance]);
  return null;
};

export {
  AutoLODSystem
};
