import {
  usePlugin
} from "./chunk-I3ICZD4F.js";
import {
  MeasurementToolPlugin
} from "./chunk-3R7JMNWE.js";

// src/react/components/MeasurementTool.tsx
import { useCallback, useMemo } from "react";
var MeasurementTool = ({
  enabled = true,
  pointRadius = 0.05,
  color = 65280,
  onMeasure
}) => {
  const handleMeasure = useCallback(
    (event) => {
      if (event.distance !== void 0 && event.points.length === 2) {
        onMeasure?.(
          event.distance,
          [event.points[0], event.points[1]]
        );
      }
    },
    [onMeasure]
  );
  const config = useMemo(
    () => ({
      enabled,
      pointRadius,
      color,
      onMeasure: handleMeasure
    }),
    [enabled, pointRadius, color, handleMeasure]
  );
  const factory = useCallback(() => new MeasurementToolPlugin(), []);
  usePlugin(factory, config);
  return null;
};

export {
  MeasurementTool
};
