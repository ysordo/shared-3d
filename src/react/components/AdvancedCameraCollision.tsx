'use client';

import { useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AdvancedCameraCollisionPlugin } from '../../core/orchestrator/plugins/AdvancedCameraCollisionPlugin';
import { useActiveModel } from '../../hooks/useActiveModel';

type AdvancedCameraCollisionProps = {
  distanceThreshold?: number;
  pushBackOffset?: number;
  smooth?: number;
  enabled?: boolean;
};

export const AdvancedCameraCollision: React.FC<
  AdvancedCameraCollisionProps
> = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true,
}) => {
  const model = useActiveModel();

  const deps = useMemo(
    () => [distanceThreshold, pushBackOffset, smooth, model, enabled],
    [distanceThreshold, pushBackOffset, smooth, model, enabled]
  );

  usePlugin(
    new AdvancedCameraCollisionPlugin(distanceThreshold, pushBackOffset, smooth),
    deps
  );
  
  return null;
};
