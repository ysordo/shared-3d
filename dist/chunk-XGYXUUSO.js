import {
  AdvancedRaycasterPlugin
} from "./chunk-NNMHNVZD.js";
import {
  useActiveModel
} from "./chunk-5GDA5ZP7.js";
import {
  useScene
} from "./chunk-YXZQN2XJ.js";

// src/react/components/AdvancedRaycaster.tsx
import { useEffect } from "react";
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
  const orchestrator = useScene();
  const activeModel = useActiveModel();
  useEffect(() => {
    const plugin = new AdvancedRaycasterPlugin(
      customModel || activeModel || void 0,
      (e) => {
        switch (e.type) {
          case "objectclick":
            onClick?.(e);
            break;
          case "objecthoverin":
            onHoverIn?.(e);
            break;
          case "objecthoverout":
            onHoverOut?.(e);
            break;
          case "objecthovermove":
            onHoverMove?.(e);
            break;
          case "objectdragstart":
            onDragStart?.(e);
            break;
          case "objectdrag":
            onDrag?.(e);
            break;
          case "objectdragend":
            onDragEnd?.(e);
            break;
        }
      }
    );
    orchestrator.use(plugin);
  }, [
    customModel,
    activeModel,
    onClick,
    onHoverIn,
    onHoverOut,
    onHoverMove,
    onDragStart,
    onDrag,
    onDragEnd
  ]);
  return null;
};

export {
  AdvancedRaycaster
};
