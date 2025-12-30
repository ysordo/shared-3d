'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../hooks/usePlugin';
import { RaycasterPlugin } from '../../core/plugins/RaycasterPlugin';
import type { THREE } from '../../lib';

type RaycasterProps = {
  /** Habilitar/deshabilitar el raycasting */
  enabled?: boolean;
  /** Objetos específicos a intersectar (si no se proporciona, usa toda la escena) */
  objects?: THREE.Object3D[];
  /** Callback para click sobre objeto */
  onClick?: (obj: THREE.Object3D) => void;
  /** Callback para hover (enter/move) sobre objeto */
  onHover?: (obj: THREE.Object3D) => void;
};

/**
 * Raycaster
 *
 * Componente declarativo básico para interacción simple (click + hover) con raycasting.
 *
 * Características:
 * - Configuración totalmente reactiva mediante usePlugin inteligente (deep equality + update() automático).
 * - Handler único estabilizado → actualizaciones en caliente sin recrear listeners.
 * - Soporte opcional para lista de objetos específica o fallback a escena completa.
 * - Instancia única del plugin + hot-update eficiente.
 * - Componente headless puro (sin renderizado visual propio).
 *
 * Ideal para selección básica, tooltips simples o feedback hover cuando no se necesita drag ni throttling avanzado
 * (para funcionalidades completas usar <AdvancedRaycaster />).
 *
 * @example
 * <Raycaster
 *   enabled={isInteractive}
 *   onClick={(obj) => console.log('Clicked:', obj.name)}
 *   onHover={(obj) => setHovered(obj)}
 * />
 */
export const Raycaster: React.FC<RaycasterProps> = ({
  enabled = true,
  objects,
  onClick,
  onHover,
}) => {
  // Handler único y estabilizado
  const handleEvent = useCallback(
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

  // Configuración completa → fuente de verdad para deep equality
  const config = useMemo(
    () => ({
      enabled,
      objects: objects ?? undefined,
      onEvent: handleEvent,
    }),
    [enabled, objects, handleEvent]
  );

  // Factory estable (sin dependencias externas)
  const factory = useCallback(() => new RaycasterPlugin(), []);

  // usePlugin maneja creación, hot-update y dispose automáticamente
  usePlugin(factory, config);

  return null;
};
