'use client';

import { useCallback, useEffect } from 'react';
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
  const factory = useCallback(() => {
    // Si no hay modelo, crear plugin "dummy" inofensivo
    // o retornar null → pero usePlugin maneja null
    if (!target) {
      // Plugin dummy que no hace nada
      return new HotspotPlugin([
        {
          id,
          position: new THREE.Vector3(...position),
          target: new THREE.Object3D(),
          onClick,
        },
      ]);
    }
    return new HotspotPlugin([
      {
        id,
        position: new THREE.Vector3(...position),
        target,
        onClick,
      },
    ]);
  }, [id, position, target, onClick]);

  const plugin = usePlugin(factory, []);

  useEffect(() => {
    if (target) {
      plugin?.update([
        {
          id,
          position: new THREE.Vector3(...position),
          target,
          onClick,
        },
      ]);
    }
  }, [id, position, target, onClick, plugin]);

  return null;
};
