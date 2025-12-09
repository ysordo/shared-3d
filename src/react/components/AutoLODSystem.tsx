'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { AutoLODSystemPlugin } from '../../core/orchestrator/plugins/AutoLODSystemPlugin';

type AutoLODSystemProps = {
  mediumDistance?: number;
  lowDistance?: number;
  hideDistance?: number;
};

export const AutoLODSystem: React.FC<AutoLODSystemProps> = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
}) => {
  const orchestrator = useScene();

  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    if (orchestrator.has('AutoLODSystem')) {
      return;
    }
    orchestrator.use(
      new AutoLODSystemPlugin({
        distances: [mediumDistance, lowDistance, hideDistance],
      })
    );

    return () => {
      orchestrator.plugin('AutoLODSystem').dispose?.();
      orchestrator.remove('AutoLODSystem');
    };
  }, [orchestrator]);

  useEffect(() => {
    if (orchestrator.has('AutoLODSystem')) {
      orchestrator.remove('AutoLODSystem');
    }
    orchestrator.use(
      new AutoLODSystemPlugin({
        distances: [mediumDistance, lowDistance, hideDistance],
      })
    );
  }, [mediumDistance, lowDistance, hideDistance]);

  return null;
};
