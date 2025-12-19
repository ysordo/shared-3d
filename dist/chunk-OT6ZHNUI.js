import {
  useScene
} from "./chunk-WL7FXELW.js";
import {
  RaycasterPlugin
} from "./chunk-D6IH2BXA.js";

// src/react/components/Raycaster.tsx
import { useEffect } from "react";
var Raycaster = ({ onClick, onHover }) => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    const plugin = new RaycasterPlugin((event) => {
      if (event.type === "click" && onClick) {
        onClick(event.object);
      }
      if (event.type === "hover" && onHover) {
        onHover(event.object);
      }
    });
    orchestrator.use(plugin);
  }, [orchestrator, onClick, onHover]);
  return null;
};

export {
  Raycaster
};
