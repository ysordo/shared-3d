import {
  usePlugin
} from "./chunk-ODSDUJWQ.js";
import {
  MeasurementToolPlugin
} from "./chunk-PRNY2PGZ.js";

// src/react/components/MeasurementTool.tsx
import { useCallback, useMemo } from "react";
var MeasurementTool = ({
  enabled = true,
  onMeasure
}) => {
  const callback = useCallback(
    (event) => {
      if (event.distance !== void 0 && event.points.length === 2) {
        onMeasure?.(event.distance, [event.points[0], event.points[1]]);
      }
    },
    [onMeasure]
  );
  const deps = useMemo(() => [callback, enabled], [callback, enabled]);
  usePlugin(new MeasurementToolPlugin(callback), deps);
  return null;
};

export {
  MeasurementTool
};
