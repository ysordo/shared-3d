import {
  usePlugin
} from "./chunk-BDCH4C4X.js";
import {
  AdvancedRaycasterPlugin
} from "./chunk-OHN5TLPQ.js";
import {
  useActiveModel
} from "./chunk-CBC77TWZ.js";

// src/react/components/AdvancedRaycaster.tsx
import { useCallback } from "react";
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
  const factory = useCallback(() => {
    if (customModel) {
      return new AdvancedRaycasterPlugin(customModel, handler);
    } else if (activeModel) {
      return new AdvancedRaycasterPlugin(activeModel, handler);
    }
    return null;
  }, [customModel, activeModel, handler]);
  usePlugin(
    factory,
    [factory]
  );
  return null;
};

export {
  AdvancedRaycaster
};
