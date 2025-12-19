import {
  usePlugin
} from "./chunk-UHZBSJS6.js";
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
  const deps = useMemo(() => [callback, enabled], [callback, enabled]);
  usePlugin(
    new MeasurementToolPlugin((event) => {
      if (event.distance !== void 0 && event.points.length === 2) {
        callback(event.distance, [event.points[0], event.points[1]]);
      }
    }),
    deps
  );
  return null;
};

export {
  MeasurementTool
};
