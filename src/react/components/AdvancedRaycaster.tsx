'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
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
  const orchestrator = useScene();
  const activeModel = useActiveModel();

  useEffect(() => {
    const plugin = new AdvancedRaycasterPlugin(
      customModel || activeModel || undefined,
      (e: any) => {
        switch (e.type) {
          case 'objectclick':
            onClick?.(e);
            break;
          case 'objecthoverin':
            onHoverIn?.(e);
            break;
          case 'objecthoverout':
            onHoverOut?.(e);
            break;
          case 'objecthovermove':
            onHoverMove?.(e);
            break;
          case 'objectdragstart':
            onDragStart?.(e);
            break;
          case 'objectdrag':
            onDrag?.(e);
            break;
          case 'objectdragend':
            onDragEnd?.(e);
            break;
        }
      }
    );

    orchestrator.use(plugin);
  }, [
    customModel,
    activeModel,
    onClick,
    onHoverIn,
    onHoverOut,
    onHoverMove,
    onDragStart,
    onDrag,
    onDragEnd,
  ]);

  return null;
};
