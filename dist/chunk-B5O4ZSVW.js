import {
  usePlugin
} from "./chunk-UHZBSJS6.js";
import {
  useScene
} from "./chunk-Z3ENXIV3.js";
import {
  RaycasterPlugin
} from "./chunk-D6IH2BXA.js";

// src/react/components/Raycaster.tsx
import { useCallback, useMemo } from "react";
var Raycaster = ({ onClick, onHover }) => {
  const orchestrator = useScene();
  const handle = useCallback(
    (event) => {
      if (event.type === "click" && onClick) {
        onClick(event.object);
      }
      if (event.type === "hover" && onHover) {
        onHover(event.object);
      }
    },
    [onClick, onHover]
  );
  const config = useMemo(() => handle, [handle]);
  const deps = useMemo(() => [handle], [handle]);
  usePlugin(new RaycasterPlugin(config), deps);
  return null;
};

export {
  Raycaster
};
