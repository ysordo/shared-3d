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

  usePlugin(() => new AutoLODSystemPlugin(config), enabled ? [config] : []);

  if (!enabled) {
    return null;
  }
  return null;
};
