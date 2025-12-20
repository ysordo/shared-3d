import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  RaycasterPlugin
} from "./chunk-ZG7WQCBJ.js";

// src/react/components/Raycaster.tsx
import { useCallback, useEffect } from "react";
var Raycaster = ({
  enabled = true,
  objects,
  onClick,
  onHover
}) => {
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
  const factory = useCallback(
    () => new RaycasterPlugin({ enabled, objects, onEvent: handle }),
    [enabled, objects, handle]
  );
  const plugin = usePlugin(factory, []);
  useEffect(() => {
    plugin?.update({ enabled, objects, onEvent: handle });
  }, [enabled, objects, handle, plugin]);
  return null;
};

export {
  Raycaster
};
