'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../hooks/usePlugin';
import { AdvancedRaycasterPlugin } from '../../core/plugins/AdvancedRaycasterPlugin';
import { useActiveModel } from '../hooks/useActiveModel';
import type { THREE } from '../../lib';

type AdvancedRaycasterProps = {
  /** Modelo específico para raycasting (si no se proporciona, usa el modelo activo global) */
  model?: THREE.Object3D | null;

  /** Callback para click sobre objeto */
  onClick?: (event: {
    object: THREE.Object3D;
    point: THREE.Vector3;
    distance: number;
  }) => void;
  /** Callback para hover enter */
  onHoverIn?: (event: {
    object: THREE.Object3D;
    point: THREE.Vector3;
    distance: number;
  }) => void;
  /** Callback para hover leave */
  onHoverOut?: (event: { object: THREE.Object3D }) => void;
  /** Callback para hover move */
  onHoverMove?: (event: {
    object: THREE.Object3D;
    point: THREE.Vector3;
    distance: number;
  }) => void;
  /** Callback para inicio de drag */
  onDragStart?: (event: { object: THREE.Object3D }) => void;
  /** Callback durante drag */
  onDrag?: (event: {
    object: THREE.Object3D;
    delta: THREE.Vector2;
    normalizedDelta: THREE.Vector2;
  }) => void;
  /** Callback para fin de drag */
  onDragEnd?: (event: { object: THREE.Object3D }) => void;
};

/**
 * AdvancedRaycaster
 *
 * Componente declarativo para interacción avanzada con raycasting (click, hover, drag).
 *
 * Características:
 * - Soporte completo para todos los eventos del AdvancedRaycasterPlugin.
 * - Modelo objetivo flexible: custom o fallback al modelo activo global.
 * - Configuración totalmente reactiva mediante usePlugin inteligente (deep equality + hot-update).
 * - Handler único estabilizado → actualizaciones en caliente sin recrear plugin innecesariamente.
 * - Instancia dummy segura cuando no hay modelo → evita errores y mantiene ciclo de vida.
 * - Componente headless puro (sin renderizado visual).
 *
 * Ideal para selección avanzada, tooltips dinámicos, drag de partes o feedback visual rico.
 *
 * @example
 * <AdvancedRaycaster
 *   onClick={(e) => console.log('Clicked:', e.object.name)}
 *   onHoverIn={(e) => setHovered(e.object)}
 *   onHoverOut={() => setHovered(null)}
 * />
 */
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

  // Handler único y estabilizado
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

  // Configuración completa → deep equality en usePlugin
  const config = useMemo(
    () => ({
      model: targetModel ?? null,
      onEvent: handler,
    }),
    [targetModel, handler]
  );

  // Factory estable (sin dependencias)
  const factory = useCallback(
    () => new AdvancedRaycasterPlugin(null, undefined),
    []
  );

  // usePlugin maneja creación, hot-update (model + handler) y dispose automáticamente
  usePlugin(factory, config);

  // Si no hay modelo → no renderizamos nada (headless)
  // El plugin dummy ya está instalado y no hace daño
  return null;
};
