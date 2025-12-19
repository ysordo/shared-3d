'use client';
import type React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { useScene } from '../../hooks/useScene';
import { RaycasterPlugin } from '../../core/orchestrator/plugins';
import type { THREE } from '../../lib';
import { usePlugin } from '../../hooks/usePlugin';

type RaycasterProps = {
  onClick?: (obj: THREE.Object3D) => void;
  onHover?: (obj: THREE.Object3D) => void;
};

export const Raycaster: React.FC<RaycasterProps> = ({ onClick, onHover }) => {
  const orchestrator = useScene();

  const handle = useCallback(
    (event: any) => {
      if (event.type === 'click' && onClick) {
        onClick(event.object);
      }
      if (event.type === 'hover' && onHover) {
        onHover(event.object);
      }
    },
    [onClick, onHover]
  );

  const config = useMemo(() => handle, [handle]);
  const deps = useMemo(() => [handle], [handle]);

  usePlugin(new RaycasterPlugin(config), deps);

  return null;
};
