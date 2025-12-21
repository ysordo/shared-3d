'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import type { LODConfig } from '../../core/orchestrator/plugins/LODSystemPlugin';
import { LODSystemPlugin } from '../../core/orchestrator/plugins/LODSystemPlugin';
import type { THREE } from '../../lib';

type LODLevel = {
  distance: number;
  model: THREE.Object3D;
};

type LODSystemProps = {
  levels: LODLevel[];
  hysteresis?: number;
  enabled?: boolean;
};

/**
 * LODSystem
 *
 * Componente declarativo para Level of Detail manual basado en modelos predefinidos.
 *
 * Corrección clave:
 * - Eliminado return temprano condicional → evita violación de Rules of Hooks.
 * - Instalación del plugin controlada mediante config.enabled → usePlugin decide si crear o no (hot-update a enabled: false deshabilita internamente).
 * - Mantiene zero overhead cuando enabled=false (plugin no se crea o se deshabilita en caliente).
 *
 * @example
 * <LODSystem
 *   enabled={isLODActive}
 *   hysteresis={0.15}
 *   levels={[...]}
 * />
 */
export const LODSystem: React.FC<LODSystemProps> = ({
  levels,
  hysteresis = 0.1,
  enabled = true,
}) => {
  // Configuración completa → incluye enabled para control de ciclo de vida
  const config = useMemo<LODConfig & { enabled: boolean }>(
    () => ({
      levels,
      hysteresis,
      enabled,
    }),
    [levels, hysteresis, enabled]
  );

  // Factory estable
  const factory = useCallback(
    () => new LODSystemPlugin({ levels: [], hysteresis: 0 }),
    []
  );

  // usePlugin decide crear/instalar solo si enabled=true en config
  // Cuando enabled cambia a false → update() con enabled:false (el plugin puede desactivar internamente)
  usePlugin(factory, config);

  return null;
};
