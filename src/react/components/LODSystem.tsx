'use client';

import { useMemo } from 'react';
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
  const config = useMemo(() => [{ levels, hysteresis }], [levels, hysteresis]);

  usePlugin(() => new LODSystemPlugin(config), enabled ? config : []);

  if (!enabled) {
    return null;
  }
  return null;
};
