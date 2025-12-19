import {
  usePlugin
} from "./chunk-BDCH4C4X.js";
import {
  RaycasterPlugin
} from "./chunk-D6IH2BXA.js";

// src/react/components/Raycaster.tsx
import { useCallback } from "react";
var Raycaster = ({ onClick, onHover }) => {
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
  const factory = useCallback(() => new RaycasterPlugin(handle), [handle]);
  usePlugin(factory, [factory]);
  return null;
};

export {
  Raycaster
};
