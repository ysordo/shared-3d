/* eslint-disable react-hooks/exhaustive-deps */
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
    const plugin = new AutoLODSystemPlugin({
      distances: [mediumDistance, lowDistance, hideDistance],
    });
    orchestrator.use(plugin);

    return () => {
      plugin.dispose();
    };
  }, [mediumDistance, lowDistance, hideDistance]);

  return null;
};
