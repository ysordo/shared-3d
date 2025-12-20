'use client';

import { useCallback, useEffect } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import type { MeasurementEvent } from '../../core/orchestrator/plugins';
import { MeasurementToolPlugin } from '../../core/orchestrator/plugins';

type MeasurementToolProps = {
  enabled?: boolean;
  pointRadius?: number;
  color?: number;
  onMeasure?: (distance: number, points: [any, any]) => void;
};

export const MeasurementTool: React.FC<MeasurementToolProps> = ({
  enabled = true,
  pointRadius = 0.05,
  color = 0x00ff00,
  onMeasure,
}) => {
  const callback = useCallback(
    (event: MeasurementEvent) => {
      if (event.distance !== undefined && event.points.length === 2) {
        onMeasure?.(event.distance, [event.points[0], event.points[1]]);
      }
    },
    [onMeasure]
  );
  const factory = useCallback(
    () =>
      new MeasurementToolPlugin({
        color,
        enabled,
        pointRadius,
        onMeasure: callback,
      }),
    [color, enabled, pointRadius, callback]
  );

  const plugin = usePlugin(factory, []);
  useEffect(() => {
    plugin?.update({ color, enabled, pointRadius, onMeasure: callback });
  }, [color, enabled, pointRadius, callback, plugin]);
  return null;
};
