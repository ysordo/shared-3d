/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { LODSystemPlugin } from '../../core/orchestrator/plugins/LODSystemPlugin';
import type { THREE } from '../../lib';

type LODLevel = {
  distance: number;
  model: THREE.Object3D;
};

type LODSystemProps = {
  levels: LODLevel[];
  hysteresis?: number;
};

export const LODSystem: React.FC<LODSystemProps> = ({
  levels,
  hysteresis = 0.1,
}) => {
  const orchestrator = useScene();

  useEffect(() => {
    const plugin = new LODSystemPlugin([{ levels, hysteresis }]);
    orchestrator.use(plugin);

    return () => {
      plugin.dispose();
    };
  }, [levels, hysteresis]);

  return null;
};
