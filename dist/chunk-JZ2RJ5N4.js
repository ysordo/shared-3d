import {
  useScene
} from "./chunk-BSKDNZA4.js";
import {
  MeasurementToolPlugin
} from "./chunk-PRNY2PGZ.js";

// src/react/components/MeasurementTool.tsx
import { useEffect } from "react";
var MeasurementTool = ({
  enabled = true,
  color = "#00ff00",
  onMeasure
}) => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const plugin = new MeasurementToolPlugin((event) => {
      if (event.distance !== void 0 && event.points.length === 2) {
        onMeasure?.(event.distance, [event.points[0], event.points[1]]);
      }
    });
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [enabled, onMeasure]);
  return null;
};

export {
  MeasurementTool
};
