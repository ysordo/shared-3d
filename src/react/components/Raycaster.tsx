'use client';

import { useCallback, useEffect } from 'react';
import { RaycasterPlugin } from '../../core/orchestrator/plugins/RaycasterPlugin';
import { usePlugin } from '../../hooks/usePlugin';
import type { THREE } from '../../lib';

type RaycasterProps = {
  enabled?: boolean;
  objects?: THREE.Object3D[];
  onClick?: (obj: THREE.Object3D) => void;
  onHover?: (obj: THREE.Object3D) => void;
};

export const Raycaster: React.FC<RaycasterProps> = ({
  enabled = true,
  objects,
  onClick,
  onHover,
}) => {
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

  const factory = useCallback(
    () => new RaycasterPlugin({ enabled, objects, onEvent: handle }),
    [enabled, objects, handle]
  );

  const plugin = usePlugin(factory, []);
  useEffect(() => {
    plugin?.update({ enabled, objects, onEvent: handle });
  }, [enabled, objects, handle, plugin]);
  return null;
};
