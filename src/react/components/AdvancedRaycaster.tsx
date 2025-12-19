'use client';

import { useCallback } from 'react';
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

  const factory = useCallback(() => {
    if (customModel) {
      return new AdvancedRaycasterPlugin(customModel, handler);
    }else if(activeModel){
      return new AdvancedRaycasterPlugin(activeModel, handler);
    }
    return null;
  }, [customModel, activeModel, handler]);

  usePlugin(
    factory,
    [factory]
  );

  return null;
};
