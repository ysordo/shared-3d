import {
  usePlugin
} from "./chunk-IXIKC576.js";
import {
  AdvancedRaycasterPlugin
} from "./chunk-OHN5TLPQ.js";
import {
  useActiveModel
} from "./chunk-USX3QEV5.js";

// src/react/components/AdvancedRaycaster.tsx
import { useCallback, useMemo } from "react";
var AdvancedRaycaster = ({
  model: customModel,
  onClick,
  onHoverIn,
  onHoverOut,
  onHoverMove,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  const activeModel = useActiveModel();
  const targetModel = customModel ?? activeModel;
  const handler = useCallback(
    (event) => {
      switch (event.type) {
        case "objectclick":
          onClick?.(event);
          break;
        case "objecthoverin":
          onHoverIn?.(event);
          break;
        case "objecthoverout":
          onHoverOut?.(event);
          break;
        case "objecthovermove":
          onHoverMove?.(event);
          break;
        case "objectdragstart":
          onDragStart?.(event);
          break;
        case "objectdrag":
          onDrag?.(event);
          break;
        case "objectdragend":
          onDragEnd?.(event);
          break;
      }
    },
    [
      onClick,
      onHoverIn,
      onHoverOut,
      onHoverMove,
      onDragStart,
      onDrag,
      onDragEnd
    ]
  );
  const deps = useMemo(() => [targetModel, handler], [targetModel, handler]);
  usePlugin(
    () => new AdvancedRaycasterPlugin(targetModel, handler),
    [...deps]
  );
  return null;
};

export {
  AdvancedRaycaster
};
