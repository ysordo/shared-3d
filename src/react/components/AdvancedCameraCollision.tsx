'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { AdvancedCameraCollisionPlugin } from '../../core/orchestrator/plugins/AdvancedCameraCollisionPlugin';

type AdvancedCameraCollisionProps = {
  distanceThreshold?: number;
  pushBackOffset?: number;
  enabled?: boolean;
};

export const AdvancedCameraCollision: React.FC<
  AdvancedCameraCollisionProps
> = ({ distanceThreshold = 0.6, pushBackOffset = 0.1, enabled = true }) => {
  const orchestrator = useScene();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const plugin = new AdvancedCameraCollisionPlugin(
      distanceThreshold,
      pushBackOffset
    );
    orchestrator.use(plugin);

    return () => {
      plugin.dispose();
    };
  }, [enabled, distanceThreshold, pushBackOffset]);

  return null;
};
