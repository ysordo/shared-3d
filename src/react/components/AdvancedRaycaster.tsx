'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AdvancedRaycasterPlugin } from '../../core/orchestrator/plugins/AdvancedRaycasterPlugin';
import { useActiveModel } from '../../hooks/useActiveModel';
import type { THREE } from '../../lib';

type AdvancedRaycasterProps = {
  model?: THREE.Object3D;
  onClick?: (e: any) => void;
  onHoverIn?: (e: any) => void;
  onHoverOut?: (e: any) => void;
  onHoverMove?: (e: any) => void;
  onDragStart?: (e: any) => void;
  onDrag?: (e: any) => void;
  onDragEnd?: (e: any) => void;
};

export const AdvancedRaycaster: React.FC<AdvancedRaycasterProps> = ({
  model: customModel,
  onClick,
  onHoverIn,
  onHoverOut,
  onHoverMove,
  onDragStart,
  onDrag,
  onDragEnd,
}) => {
  const activeModel = useActiveModel();
  const targetModel = customModel ?? activeModel;

  const handler = useCallback(
    (event: any) => {
      switch (event.type) {
        case 'objectclick':
          onClick?.(event);
          break;
        case 'objecthoverin':
          onHoverIn?.(event);
          break;
        case 'objecthoverout':
          onHoverOut?.(event);
          break;
        case 'objecthovermove':
          onHoverMove?.(event);
          break;
        case 'objectdragstart':
          onDragStart?.(event);
          break;
        case 'objectdrag':
          onDrag?.(event);
          break;
        case 'objectdragend':
          onDragEnd?.(event);
          break;
      }
    },
    [
      onClick,
      onHoverIn,
      onHoverOut,
      onHoverMove,
      onDragStart,
      onDrag,
      onDragEnd,
    ]
  );

  const deps = useMemo(() => [targetModel, handler], [targetModel, handler]);

  usePlugin(
    () => new AdvancedRaycasterPlugin(targetModel as THREE.Object3D, handler),
    deps
  );

  return null;
};
