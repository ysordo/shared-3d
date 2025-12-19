'use client';

import { useCallback } from 'react';
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
  const factory = useCallback(
    () =>
      new AutoLODSystemPlugin({
        distances: [mediumDistance, lowDistance, hideDistance],
        reductionPercentages,
      }),
    [mediumDistance, lowDistance, hideDistance, reductionPercentages]
  );

  usePlugin(factory, [factory], enabled);

  return null;
};
