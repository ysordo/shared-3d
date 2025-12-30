'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../hooks/usePlugin';
import { AdvancedCameraCollisionPlugin } from '../../core/plugins/AdvancedCameraCollisionPlugin';

type Props = {
  /** Distancia mínima de detección de colisión (en unidades del mundo) */
  distanceThreshold?: number;
  /** Offset adicional de retroceso al detectar colisión */
  pushBackOffset?: number;
  /** Factor de suavizado (lerp) para el movimiento de corrección (0-1) */
  smooth?: number;
  /** Habilitar/deshabilitar la colisión */
  enabled?: boolean;
};

/**
 * AdvancedCameraCollision
 *
 * Componente declarativo para activar prevención de colisiones avanzada en la cámara.
 *
 * Características:
 * - Configuración totalmente reactiva (cambios en props → hot-update automático).
 * - Integración óptima con usePlugin inteligente: instancia única + update() en caliente.
 * - Sin renderizado visual → componente "headless" puro.
 * - Preparado para uso en escenas complejas con navegación orbital.
 *
 * @example
 * <AdvancedCameraCollision
 *   distanceThreshold={0.8}
 *   pushBackOffset={0.2}
 *   smooth={0.15}
 *   enabled={isCollisionEnabled}
 * />
 */
export const AdvancedCameraCollision: React.FC<Props> = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true,
}) => {
  // Configuración consolidada → fuente de verdad para deep equality en usePlugin
  const config = useMemo(
    () => ({
      distanceThreshold,
      pushBackOffset,
      smooth,
      enabled,
    }),
    [distanceThreshold, pushBackOffset, smooth, enabled]
  );

  const factory = useCallback(() => new AdvancedCameraCollisionPlugin(), []);

  usePlugin(factory, config);

  return null;
};
