import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  MeasurementToolPlugin
} from "./chunk-EG6Z44HJ.js";

// src/react/components/MeasurementTool.tsx
import { useCallback, useEffect } from "react";
var MeasurementTool = ({
  enabled = true,
  pointRadius = 0.05,
  color = 65280,
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
    () => new MeasurementToolPlugin({
      color,
      enabled,
      pointRadius,
      onMeasure: callback
    }),
    [color, enabled, pointRadius, callback]
  );
  const plugin = usePlugin(factory, []);
  useEffect(() => {
    plugin?.update({ color, enabled, pointRadius, onMeasure: callback });
  }, [color, enabled, pointRadius, callback, plugin]);
  return null;
};

export {
  MeasurementTool
};
