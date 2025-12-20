import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  AdvancedRaycasterPlugin
} from "./chunk-RKIYRG5U.js";
import {
  useActiveModel
} from "./chunk-CBC77TWZ.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/AdvancedRaycaster.tsx
import { useCallback, useEffect } from "react";
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
      if (!targetModel) {
        return;
      }
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
      targetModel,
      // Incluido para reactividad si cambia
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
    if (!targetModel) {
      return new AdvancedRaycasterPlugin(new THREE.Object3D(), () => {
      });
    }
    return new AdvancedRaycasterPlugin(targetModel, handler);
  }, []);
  const plugin = usePlugin(factory, [targetModel, handler]);
  useEffect(() => {
    if (targetModel) {
      plugin?.update(targetModel, handler);
    }
  }, [targetModel, handler, plugin]);
  if (!targetModel) {
    return null;
  }
  return null;
};

export {
  AdvancedRaycaster
};
