/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { MeasurementToolPlugin } from '../../core/orchestrator/plugins/MeasurementToolPlugin';
import type { THREE } from '../../lib';

type MeasurementToolProps = {
  enabled?: boolean;
  color?: string;
  onMeasure?: (
    distance: number,
    points: [THREE.Vector3, THREE.Vector3]
  ) => void;
};

export const MeasurementTool: React.FC<MeasurementToolProps> = ({
  enabled = true,
  color = '#00ff00',
  onMeasure,
}) => {
  const orchestrator = useScene();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const plugin = new MeasurementToolPlugin((event) => {
      if (event.distance !== undefined && event.points.length === 2) {
        onMeasure?.(event.distance, [(event.points[0] as THREE.Vector3), (event.points[1] as THREE.Vector3)]);
      }
    });

    orchestrator.use(plugin);

    return () => {
      plugin.dispose();
    };
  }, [enabled, onMeasure]);

  return null;
};
