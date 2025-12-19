'use client';

import { useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { HotspotPlugin } from '../../core/orchestrator/plugins/HotspotPlugin';
import { THREE } from '../../lib';

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
  const data = useMemo(
    () => ({
      id,
      position: new THREE.Vector3(...position),
      target,
      onClick,
    }),
    [id, position, target, onClick]
  );



  usePlugin(new HotspotPlugin([data]), [data]);

  return null;
};