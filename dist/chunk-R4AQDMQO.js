import {
  usePlugin
} from "./chunk-FA2SQMD7.js";
import {
  AdvancedRaycasterPlugin
} from "./chunk-QGUYSH32.js";
import {
  useActiveModel
} from "./chunk-L4P2DOS4.js";

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
  const config = useMemo(
    () => ({
      model: targetModel ?? null,
      onEvent: handler
    }),
    [targetModel, handler]
  );
  const factory = useCallback(
    () => new AdvancedRaycasterPlugin(null, void 0),
    []
  );
  usePlugin(factory, config);
  return null;
};

export {
  AdvancedRaycaster
};
