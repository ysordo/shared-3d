import {
  useScene
} from "./chunk-6QOVQIX3.js";
import {
  RaycasterPlugin
} from "./chunk-D6IH2BXA.js";

// src/react/components/Raycaster.tsx
import { useEffect } from "react";
var Raycaster = ({ onClick, onHover }) => {
  const orchestrator = useScene();
  useEffect(() => {
    const plugin = new RaycasterPlugin((event) => {
      if (event.type === "click" && onClick) {
        onClick(event.object);
      }
      if (event.type === "hover" && onHover) {
        onHover(event.object);
      }
    });
    orchestrator.use(plugin);
  }, [onClick, onHover]);
  return null;
};

export {
  Raycaster
};
