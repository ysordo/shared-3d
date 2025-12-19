'use client';

import { useCallback } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { LODSystemPlugin } from '../../core/orchestrator/plugins/LODSystemPlugin';
import type { THREE } from '../../lib';

type LODLevel = {
  distance: number;
  model: THREE.Object3D;
};

type LODSystemProps = {
  levels: LODLevel[];
  hysteresis?: number;
  enabled?: boolean;
};

export const LODSystem: React.FC<LODSystemProps> = ({
  levels,
  hysteresis = 0.1,
  enabled = true,
}) => {
  const factory = useCallback(
    () => new LODSystemPlugin([{ levels, hysteresis }]),
    [levels, hysteresis, enabled]
  );

  usePlugin(factory, [factory]);

  if (!enabled) {
    return null;
  }
  return null;
};
