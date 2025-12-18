import {
  usePlugin
} from "./chunk-NTFUNM7V.js";
import {
  MeasurementToolPlugin
} from "./chunk-PRNY2PGZ.js";

// src/react/components/MeasurementTool.tsx
import { useMemo } from "react";
var MeasurementTool = ({
  enabled = true,
  onMeasure
}) => {
  const callback = useMemo(() => onMeasure ?? (() => {
  }), [onMeasure]);
  usePlugin(
    () => new MeasurementToolPlugin((event) => {
      if (event.distance !== void 0 && event.points.length === 2) {
        callback(event.distance, [event.points[0], event.points[1]]);
      }
    }),
    enabled ? [callback] : []
  );
  if (!enabled) {
    return null;
  }
  return null;
};

export {
  MeasurementTool
};
