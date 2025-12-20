'use client';

import { useCallback, useEffect } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AutoLODSystemPlugin } from '../../core/orchestrator/plugins/AutoLODSystemPlugin';

type AutoLODSystemProps = {
  mediumDistance?: number;
  lowDistance?: number;
  hideDistance?: number;
  reductionPercentages?: [number, number];
};

export const AutoLODSystem: React.FC<AutoLODSystemProps> = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  reductionPercentages,
}) => {
  // Factory con deps primitivas → estable y reactiva
  const factory = useCallback(
    () =>
      new AutoLODSystemPlugin({
        distances: [mediumDistance, lowDistance, hideDistance] as [
          number,
          number,
          number
        ],
        reductionPercentages,
      }),
    [mediumDistance, lowDistance, hideDistance, reductionPercentages]
  );

  // usePlugin con deps reales (sin factory)
  // Solo instala si enabled=true
  const plugin = usePlugin(factory, []);

  useEffect(() => {
    plugin?.update({
      distances: [mediumDistance, lowDistance, hideDistance] as [
        number,
        number,
        number
      ],
      reductionPercentages,
    });
  }, [mediumDistance, lowDistance, hideDistance, reductionPercentages, plugin]);

  return null;
};
