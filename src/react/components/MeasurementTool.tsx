'use client';

import { useCallback } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import type { MeasurementEvent } from '../../core/orchestrator/plugins';
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
  const callback = useCallback(
    (event: MeasurementEvent) => {
      if (event.distance !== undefined && event.points.length === 2) {
        onMeasure?.(event.distance, [event.points[0], event.points[1]]);
      }
    },
    [onMeasure]
  );
  const factory = useCallback(
    () => new MeasurementToolPlugin(callback),
    [callback]
  );

  usePlugin(factory, [factory], enabled);

  return null;
};
