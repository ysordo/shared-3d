import {
  useScene
} from "./chunk-N2Q7PBDH.js";
import {
  RaycasterPlugin
} from "./chunk-FBPG64NM.js";

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
