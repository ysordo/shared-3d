'use client';

import { useCallback } from 'react';
import { RaycasterPlugin } from '../../core/orchestrator/plugins/RaycasterPlugin';
import { usePlugin } from '../../hooks/usePlugin';
import type { THREE } from '../../lib';

type RaycasterProps = {
  /** Callback para clicks sobre objetos */
  onClick?: (obj: THREE.Object3D) => void;
  /** Callback para hover (enter + move + leave implícito en plugin) */
  onHover?: (obj: THREE.Object3D) => void;
};

export const Raycaster: React.FC<RaycasterProps> = ({
  onClick,
  onHover,
}) => {
  // Handler estable: solo cambia si callbacks cambian
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

  // Factory con dep única y estable
  const factory = useCallback(
    () => new RaycasterPlugin(handle),
    [handle]
  );

  // Instalación solo si hay al menos un callback
  // Deps: solo handle → plugin se actualiza solo cuando callbacks cambian
  usePlugin(factory, [handle]);

  return null;
};