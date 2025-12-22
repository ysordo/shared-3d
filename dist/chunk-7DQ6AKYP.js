import {
  usePlugin
} from "./chunk-YCJXIBX5.js";
import {
  RaycasterPlugin
} from "./chunk-U3LDU6I7.js";

// src/react/components/Raycaster.tsx
import { useCallback, useMemo } from "react";
var Raycaster = ({
  enabled = true,
  objects,
  onClick,
  onHover
}) => {
  const handleEvent = useCallback(
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
  const config = useMemo(
    () => ({
      enabled,
      objects: objects ?? void 0,
      onEvent: handleEvent
    }),
    [enabled, objects, handleEvent]
  );
  const factory = useCallback(() => new RaycasterPlugin(), []);
  usePlugin(factory, config);
  return null;
};

export {
  Raycaster
};
