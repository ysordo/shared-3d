'use client';

import { useCallback, useEffect } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AdvancedRaycasterPlugin } from '../../core/orchestrator/plugins/AdvancedRaycasterPlugin';
import { useActiveModel } from '../../hooks/useActiveModel';
import { THREE } from '../../lib';

type AdvancedRaycasterProps = {
  model?: THREE.Object3D;
  onClick?: (event: any) => void;
  onHoverIn?: (event: any) => void;
  onHoverOut?: (event: any) => void;
  onHoverMove?: (event: any) => void;
  onDragStart?: (event: any) => void;
  onDrag?: (event: any) => void;
  onDragEnd?: (event: any) => void;
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

  // Modelo objetivo: siempre definido aquí (puede ser null)
  const targetModel = customModel ?? activeModel;

  // Handler siempre creado (incluso si no hay modelo)
  const handler = useCallback(
    (event: any) => {
      if (!targetModel) {
        return;
      } // Guard interno

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
      targetModel, // Incluido para reactividad si cambia
      onClick,
      onHoverIn,
      onHoverOut,
      onHoverMove,
      onDragStart,
      onDrag,
      onDragEnd,
    ]
  );

  // Factory siempre creada
  const factory = useCallback(() => {
    // Si no hay modelo, crear plugin "dummy" inofensivo
    // o retornar null → pero usePlugin maneja null
    if (!targetModel) {
      // Plugin dummy que no hace nada
      return new AdvancedRaycasterPlugin(new THREE.Object3D(), () => {});
    }
    return new AdvancedRaycasterPlugin(targetModel, handler);
  }, []);

  // usePlugin siempre llamado
  const plugin = usePlugin(factory, [targetModel, handler]);
  useEffect(() => {
    if (targetModel) {
      plugin?.update(targetModel, handler);
    }
  }, [targetModel, handler, plugin]);

  // Render final: null si no hay modelo (pero hooks ya ejecutados)
  if (!targetModel) {
    return null;
  }

  return null;
};
