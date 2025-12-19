'use client';

import { useCallback } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AutoLODSystemPlugin } from '../../core/orchestrator/plugins/AutoLODSystemPlugin';
import type { AutoLODConfig } from '../../core/orchestrator/plugins/AutoLODSystemPlugin';

type AutoLODSystemProps = {
  mediumDistance?: number;
  lowDistance?: number;
  hideDistance?: number;
  reductionPercentages?: [number, number];
  enabled?: boolean;
};

export const AutoLODSystem: React.FC<AutoLODSystemProps> = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  reductionPercentages,
  enabled = true,
}) => {
  // Factory con deps primitivas → estable y reactiva
  const factory = useCallback(
    () =>
      new AutoLODSystemPlugin({
        distances: [mediumDistance, lowDistance, hideDistance] as [number, number, number],
        reductionPercentages,
      }),
    [mediumDistance, lowDistance, hideDistance, reductionPercentages]
  );

  // usePlugin con deps reales (sin factory)
  // Solo instala si enabled=true
  usePlugin(factory, enabled ? [
    mediumDistance,
    lowDistance,
    hideDistance,
    reductionPercentages,
  ] : ['disabled']);

  return null;
};