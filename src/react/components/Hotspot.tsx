'use client';
import type React from 'react';
import { useScene } from '../../hooks/useScene';
import { HotspotPlugin } from '../../core/orchestrator/plugins/HotspotPlugin';
import { THREE } from '../../lib';
import { useEffect } from 'react';

type HotspotProps = {
  id: string;
  position: [number, number, number];
  target?: THREE.Object3D;
  onClick: () => void;
};

export const Hotspot: React.FC<HotspotProps> = ({
  id,
  position,
  target,
  onClick,
}) => {
  const orchestrator = useScene();

  useEffect(() => {
    const plugin = new HotspotPlugin([
      {
        id,
        position: new THREE.Vector3(...position),
        target,
        onClick,
      },
    ]);
    orchestrator.use(plugin);

    return () => plugin.dispose();
  }, [id, position, target, onClick]);

  return null;
};
