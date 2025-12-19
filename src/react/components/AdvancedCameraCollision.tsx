'use client';

import { useCallback } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AdvancedCameraCollisionPlugin } from '../../core/orchestrator/plugins/AdvancedCameraCollisionPlugin';

type Props = {
  distanceThreshold?: number;
  pushBackOffset?: number;
  smooth?: number;
  enabled?: boolean;
};

export const AdvancedCameraCollision: React.FC<Props> = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true,
}) => {
  const factory = useCallback(
    () => new AdvancedCameraCollisionPlugin(distanceThreshold, pushBackOffset, smooth),
    [distanceThreshold, pushBackOffset, smooth]
  );

  usePlugin(factory, enabled ? [distanceThreshold, pushBackOffset, smooth] : ['disabled']);

  return null;
};