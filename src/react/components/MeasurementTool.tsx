'use client';

import { useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { MeasurementToolPlugin } from '../../core/orchestrator/plugins';

type MeasurementToolProps = {
  enabled?: boolean;
  color?: string;
  onMeasure?: (distance: number, points: [any, any]) => void;
};

export const MeasurementTool: React.FC<MeasurementToolProps> = ({
  enabled = true,
  onMeasure,
}) => {
  const callback = useMemo(() => onMeasure ?? (() => {}), [onMeasure]);

  usePlugin(
    'MeasurementTool',
    () =>
      new MeasurementToolPlugin((event) => {
        if (event.distance !== undefined && event.points.length === 2) {
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
