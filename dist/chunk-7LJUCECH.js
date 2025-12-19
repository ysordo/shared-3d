import {
  usePlugin
} from "./chunk-UHZBSJS6.js";
import {
  AdvancedRaycasterPlugin
} from "./chunk-OHN5TLPQ.js";
import {
  useActiveModel
} from "./chunk-FSU35KMZ.js";

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
  const config = useMemo(() => ({ targetModel: customModel ?? activeModel, handler }), [customModel, activeModel, handler]);
  const deps = useMemo(() => [...Object.values(config)], [...Object.values(config)]);
  usePlugin(
    new AdvancedRaycasterPlugin(config.targetModel, config.handler),
    deps
  );
  return null;
};

export {
  AdvancedRaycaster
};
