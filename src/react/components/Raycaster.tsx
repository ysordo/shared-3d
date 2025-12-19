'use client';
import type React from 'react';
import { useCallback } from 'react';
import type { RaycasterEvent } from '../../core/orchestrator/plugins';
import { RaycasterPlugin } from '../../core/orchestrator/plugins';
import type { THREE } from '../../lib';
import { usePlugin } from '../../hooks/usePlugin';

type RaycasterProps = {
  onClick?: (obj: THREE.Object3D) => void;
  onHover?: (obj: THREE.Object3D) => void;
};

export const Raycaster: React.FC<RaycasterProps> = ({ onClick, onHover }) => {
  const handle = useCallback(
    (event: RaycasterEvent) => {
      if (event.type === 'click' && onClick) {
        onClick(event.object);
      }
      if (event.type === 'hover' && onHover) {
        onHover(event.object);
      }
    },
    [onClick, onHover]
  );

  const factory = useCallback(() => new RaycasterPlugin(handle), [handle]);

  usePlugin(factory, [factory]);

  return null;
};
