'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { AdvancedCameraCollisionPlugin } from '../../core/orchestrator/plugins/AdvancedCameraCollisionPlugin';

type AdvancedCameraCollisionProps = {
  distanceThreshold?: number;
  pushBackOffset?: number;
  smooth?: number;
  enabled?: boolean;
};

export const AdvancedCameraCollision: React.FC<
  AdvancedCameraCollisionProps
> = ({ enabled = true, ...config }) => {
  const orchestrator = useScene();

  useEffect(() => {
    if (!enabled || !orchestrator || !orchestrator.getActiveModel()) {
      return;
    }
    if (orchestrator.has('AdvancedCameraCollision')) {
      return;
    }

    orchestrator.use(
      new AdvancedCameraCollisionPlugin(...Object.values(config))
    );

    return () => {
      orchestrator.plugin('AdvancedCameraCollision').dispose?.();
      orchestrator.remove('AdvancedCameraCollision');
    };
  }, [config, orchestrator, orchestrator.getActiveModel()]);

  return null;
};
