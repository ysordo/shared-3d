'use client';

import { useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import type { AutoLODConfig } from '../../core/orchestrator/plugins/AutoLODSystemPlugin';
import { AutoLODSystemPlugin } from '../../core/orchestrator/plugins/AutoLODSystemPlugin';

type AutoLODSystemProps = {
  mediumDistance?: number;
  lowDistance?: number;
  hideDistance?: number;
  enabled?: boolean;
} & Omit<AutoLODConfig, 'distances'>;

export const AutoLODSystem: React.FC<AutoLODSystemProps> = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  reductionPercentages,
  enabled = true,
}) => {
  const deps = useMemo(
    () => [
      mediumDistance,
      lowDistance,
      hideDistance,
      reductionPercentages,
      enabled,
    ],
    [mediumDistance, lowDistance, hideDistance, reductionPercentages, enabled]
  );

  usePlugin(
    new AutoLODSystemPlugin({
      distances: [mediumDistance, lowDistance, hideDistance],
      reductionPercentages,
    }),
    deps
  );

  return null;
};
