'use client';

import { useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AutoLODSystemPlugin } from '../../core/orchestrator/plugins/AutoLODSystemPlugin';

type AutoLODSystemProps = {
  mediumDistance?: number;
  lowDistance?: number;
  hideDistance?: number;
  enabled?: boolean;
};

export const AutoLODSystem: React.FC<AutoLODSystemProps> = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  enabled = true,
}) => {
  const config = useMemo(
    () => ({
      distances: [mediumDistance, lowDistance, hideDistance] as [
        number,
        number,
        number
      ],
    }),
    [mediumDistance, lowDistance, hideDistance]
  );

  const deps = useMemo(
    () => ([...Object.values(config), enabled]
    ),
    [...Object.values(config), enabled]
  );

  usePlugin(new AutoLODSystemPlugin(config), deps);

  return null;
};
