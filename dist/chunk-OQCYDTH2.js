import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  MeasurementToolPlugin
} from "./chunk-PRNY2PGZ.js";

// src/react/components/MeasurementTool.tsx
import { useCallback } from "react";
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
  const factory = useCallback(
    () => new MeasurementToolPlugin(callback),
    [callback]
  );
  usePlugin(factory, enabled ? [callback] : ["disabled"]);
  return null;
};

export {
  MeasurementTool
};
